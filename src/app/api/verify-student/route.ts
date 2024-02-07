import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs";
import PDFParser from "pdf2json";

import database from "@/database/client";
import { parseStudentSignUpPdfFileContent } from "@/utils/studentSignUpPdfFileUtils";

export async function POST(request: Request) {
    const { userId: externalUserId } = auth();
    if (!externalUserId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const pdfParser = new PDFParser();

    pdfParser.parseBuffer(buffer);
    pdfParser.on("pdfParser_dataError", (errData: any) => {
        console.error(errData.parserError);
        return new Response(null, { status: 500 });
    });
    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
        let keywords: string[] = [];
        for (let i = 0; i < pdfData.Pages[0].Texts.length; i++) {
            const text = decodeURIComponent(pdfData.Pages[0].Texts[i].R[0].T);
            if (text === "DATOS") {
                break;
            }
            keywords.push(text);
        }
        if (
            !parseStudentSignUpPdfFileContent(
                keywords,
                "2023/24",
                "the name",
                "the id number"
            )
        ) {
            return new Response(null, { status: 500 });
        }
        const { data, error } = await database
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

        return new Response(null, { status: 200 });
    });

    return new Response("ok", { status: 200 });
}
