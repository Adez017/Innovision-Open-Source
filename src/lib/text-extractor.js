/**
 * Text Extraction Service
 * Extracts readable text from PDF, TXT, and EPUB files.
 */

// pdf-parse v1 is CommonJS — dynamic import at runtime to avoid webpack bundling issues
let pdfParseModule = null;
async function getPdfParse() {
    if (!pdfParseModule) {
        pdfParseModule = (await import("pdf-parse")).default;
    }
    return pdfParseModule;
}

/**
 * Extract text from a PDF buffer
 */
async function extractFromPDF(buffer) {
    try {
        const pdfParse = await getPdfParse();
        const data = await pdfParse(buffer);
        const text = data.text;

        if (!text || text.trim().length < 50) {
            throw new Error(
                "Could not extract meaningful text from PDF. It may be a scanned/image-based PDF."
            );
        }

        return {
            text: text.trim(),
            metadata: {
                pages: data.numpages,
                info: data.info || {},
            },
        };
    } catch (error) {
        if (error.message.includes("scanned")) throw error;
        throw new Error(`PDF extraction failed: ${error.message}`);
    }
}

/**
 * Extract text from a TXT buffer
 */
async function extractFromTXT(buffer) {
    const text = buffer.toString("utf-8");

    if (!text || text.trim().length < 10) {
        throw new Error("The text file appears to be empty or unreadable.");
    }

    return {
        text: text.trim(),
        metadata: {
            encoding: "utf-8",
        },
    };
}

/**
 * Extract text from an EPUB buffer
 * Uses a lightweight approach: EPUBs are ZIP archives containing XHTML files.
 */
async function extractFromEPUB(buffer) {
    try {
        // EPUB files are ZIP archives. We'll use a dynamic import for epub2.
        const EPub = (await import("epub2")).default;
        const { writeFileSync, unlinkSync, mkdtempSync } = await import("fs");
        const { join } = await import("path");
        const { tmpdir } = await import("os");

        // epub2 requires a file path, so write buffer to a temp file
        const tempDir = mkdtempSync(join(tmpdir(), "epub-"));
        const tempPath = join(tempDir, "input.epub");
        writeFileSync(tempPath, buffer);

        const epub = await EPub.createAsync(tempPath);

        // Extract text from all chapters
        const chapters = [];
        const flow = epub.flow || [];

        for (const chapter of flow) {
            try {
                const chapterText = await new Promise((resolve, reject) => {
                    epub.getChapter(chapter.id, (err, text) => {
                        if (err) reject(err);
                        else resolve(text);
                    });
                });

                if (chapterText) {
                    // Strip HTML tags to get plain text
                    const plainText = chapterText
                        .replace(/<[^>]*>/g, " ")
                        .replace(/&nbsp;/g, " ")
                        .replace(/&amp;/g, "&")
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")
                        .replace(/&quot;/g, '"')
                        .replace(/&#\d+;/g, "")
                        .replace(/\s+/g, " ")
                        .trim();

                    if (plainText.length > 20) {
                        chapters.push({
                            id: chapter.id,
                            title: chapter.title || `Section ${chapters.length + 1}`,
                            text: plainText,
                        });
                    }
                }
            } catch {
                // Skip chapters that can't be extracted
                continue;
            }
        }

        // Clean up temp file
        try {
            unlinkSync(tempPath);
        } catch {
            // Ignore cleanup errors
        }

        const fullText = chapters.map((c) => c.text).join("\n\n");

        if (!fullText || fullText.trim().length < 50) {
            throw new Error(
                "Could not extract meaningful text from EPUB file."
            );
        }

        return {
            text: fullText.trim(),
            metadata: {
                title: epub.metadata?.title || "",
                author: epub.metadata?.creator || "",
                chapterCount: chapters.length,
                epubChapters: chapters.map((c) => ({
                    title: c.title,
                    length: c.text.length,
                })),
            },
        };
    } catch (error) {
        if (error.message.includes("Could not extract")) throw error;
        throw new Error(`EPUB extraction failed: ${error.message}`);
    }
}

/**
 * Main extraction function - routes to the appropriate extractor by file type
 */
export async function extractText(buffer, fileType) {
    const normalizedType = fileType.toLowerCase();

    switch (normalizedType) {
        case "pdf":
        case "application/pdf":
            return extractFromPDF(buffer);

        case "txt":
        case "text/plain":
            return extractFromTXT(buffer);

        case "epub":
        case "application/epub+zip":
            return extractFromEPUB(buffer);

        default:
            throw new Error(
                `Unsupported file type: ${fileType}. Supported types: PDF, TXT, EPUB`
            );
    }
}

/**
 * Detect file type from file name extension
 */
export function detectFileType(fileName) {
    const ext = fileName.split(".").pop().toLowerCase();
    const typeMap = {
        pdf: "pdf",
        txt: "txt",
        text: "txt",
        epub: "epub",
    };
    return typeMap[ext] || null;
}
