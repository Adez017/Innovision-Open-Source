
import { getServerSession } from "@/lib/auth-server";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        return NextResponse.json({ message: "Chapter added successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
