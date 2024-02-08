import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs";

import database from "@/database/client";
import { parseStudentSignUpPdfFileContent } from "@/utils/signUpPdfFileUtils";

export async function POST(request: Request) {
    const { userId: externalUserId } = auth();
    if (!externalUserId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const data = await request.formData();
    const studentFullName: string | null = data.get(
        "studentFullName"
    ) as unknown as string;
    const studentId: string | null = data.get("studentId") as unknown as string;
    const file: File | null = data.get("file") as unknown as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isFileDataValid = await parseStudentSignUpPdfFileContent(
        buffer,
        "2023/24",
        studentFullName,
        studentId
    );
    if (!isFileDataValid) {
        return new Response(null, { status: 500 });
    }

    const { error } = await database
        .from("user")
        .update({ is_verified: true })
        .eq("external_user_id", externalUserId);
    if (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }

    await clerkClient.users.updateUserMetadata(externalUserId, {
        publicMetadata: {
            studentIsVerified: true,
        },
    });

    return new Response("ok", { status: 200 });
}
