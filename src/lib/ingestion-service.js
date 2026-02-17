

import { getAdminDb, FieldValue } from "@/lib/firebase-admin";
import { extractText, detectFileType } from "@/lib/text-extractor";
import {
    chunkContentWithAI,
    generateCourseTitle,
    generateCourseDescription,
} from "@/lib/content-chunker";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["pdf", "txt", "epub"];


function validateFile(fileName, fileSize) {
    const fileType = detectFileType(fileName);

    if (!fileType) {
        throw new Error(
            `Unsupported file format. Supported: ${ALLOWED_TYPES.join(", ").toUpperCase()}`
        );
    }

    if (!ALLOWED_TYPES.includes(fileType)) {
        throw new Error(
            `Unsupported file type: .${fileType}. Supported: ${ALLOWED_TYPES.join(", ").toUpperCase()}`
        );
    }

    if (fileSize > MAX_FILE_SIZE) {
        throw new Error(
            `File too large (${(fileSize / 1024 / 1024).toFixed(1)}MB). Maximum allowed: 10MB`
        );
    }

    return fileType;
}

/**
 * Main ingestion pipeline
 * @param {Buffer} fileBuffer - The uploaded file as a buffer
 * @param {string} fileName - Original file name
 * @param {number} fileSize - File size in bytes
 * @param {string} userId - The authenticated user's ID
 * @returns {Object} Course creation result
 */
export async function ingestContent(fileBuffer, fileName, fileSize, userId) {
    const db = getAdminDb();
    if (!db) {
        throw new Error("Database connection not available. Please try again later.");
    }

    // Step 1: Validate file
    const fileType = validateFile(fileName, fileSize);

    // Step 2: Extract text
    let extractionResult;
    try {
        extractionResult = await extractText(fileBuffer, fileType);
    } catch (error) {
        throw new Error(`Text extraction failed: ${error.message}`);
    }

    const { text, metadata: extractionMetadata } = extractionResult;

    if (!text || text.length < 100) {
        throw new Error(
            "The uploaded document does not contain enough readable text to create a course."
        );
    }

    // Step 3: Generate course title and description using AI
    const [courseTitle, courseDescription] = await Promise.all([
        generateCourseTitle(fileName, text),
        generateCourseDescription(text),
    ]);


    const chapters = await chunkContentWithAI(text, fileName);



    const totalWords = chapters.reduce((sum, ch) => sum + ch.wordCount, 0);
    const estimatedReadingTime = Math.ceil(totalWords / 200); // 200 wpm average

    // Step 6: Store course in Firestore
    console.log("[DEBUG] Creating course for userId:", userId);
    const courseData = {
        userId,
        title: courseTitle,
        description: courseDescription,
        source: {
            fileName,
            fileType,
            fileSize,
            uploadedAt: FieldValue.serverTimestamp(),
        },
        metadata: {
            chapterCount: chapters.length,
            totalWords,
            estimatedReadingTime,
            extractionMetadata: extractionMetadata || {},
        },
        status: "processed",
        type: "ingested",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
    };

    const courseRef = await db.collection("ingested_courses").add(courseData);
    const courseId = courseRef.id;
    console.log("[DEBUG] Course created with ID:", courseId);

    // Step 7: Store chapters as subcollection
    const batch = db.batch();
    chapters.forEach((chapter) => {
        const chapterRef = db
            .collection("ingested_courses")
            .doc(courseId)
            .collection("chapters")
            .doc(`chapter-${chapter.chapterNumber}`);

        batch.set(chapterRef, {
            chapterNumber: chapter.chapterNumber,
            title: chapter.title,
            content: chapter.content,
            summary: chapter.summary,
            wordCount: chapter.wordCount,
            order: chapter.chapterNumber,
            createdAt: FieldValue.serverTimestamp(),
        });
    });



    await batch.commit();

    return {
        courseId,
        title: courseTitle,
        description: courseDescription,
        chapterCount: chapters.length,
        totalWords,
        estimatedReadingTime,
        chapters: chapters.map((ch) => ({
            id: `chapter-${ch.chapterNumber}`,
            chapterNumber: ch.chapterNumber,
            title: ch.title,
            summary: ch.summary,
            wordCount: ch.wordCount,
        })),

    };
}
