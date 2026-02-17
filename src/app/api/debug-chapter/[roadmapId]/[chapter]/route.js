import { db } from "@/lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { getServerSession } from "@/lib/auth-server";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { roadmapId, chapter } = await params;
        const docRef = doc(
            db,
            "users",
            session.user.email,
            "roadmaps",
            roadmapId,
            "chapters",
            chapter
        );

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({
                exists: false,
                message: "Chapter document not found"
            });
        }

        const data = docSnap.data();

        return NextResponse.json({
            exists: true,
            hasContent: !!data.content,
            contentLength: data.content?.length || 0,
            contentPreview: data.content?.substring(0, 100) || "No content",
            allFields: Object.keys(data),
            fullData: data
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
