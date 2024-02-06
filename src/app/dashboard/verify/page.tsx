"use client";

import { CustomText } from "@/components/CustomText";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function VerifyPage() {
    const [file, setFile] = useState<File>();
    const { user, isLoaded, isSignedIn } = useUser();
    if (!user) {
        return null;
    }
    if (!isLoaded) {
        return null;
    }

    if (user.publicMetadata.studentIsVerified === true) {
        return (
            <>
                <CustomText.h1>Verificar tu cuenta</CustomText.h1>
                <p>
                    Tu cuenta está verificada. Estás listo para disfrutar de
                    todos los beneficios de la DAI
                </p>
            </>
        );
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!file) {
            return null;
        }
        const data = new FormData();
        data.set("file", file);
        try {
            const response = await fetch("/api/verify-student", {
                method: "POST",
                body: data,
            });
            if (!response.ok) {
                console.error(await response.text());
                return null;
            }
            console.log(await response.text());
        } catch (error: any) {
            console.error(error);
            return null;
        }
    }

    return (
        <>
            <CustomText.h1>Verificar cuenta</CustomText.h1>
            <CustomText.h2>Sube tu matrícula</CustomText.h2>
            <p>
                No guardamos tus datos. Solo los utilizamos para verificar la
                validez de tu matrícula
            </p>
            <form
                onSubmit={onSubmit}
                className="flex flex-col items-center my-4"
            >
                <input
                    className="bg-black p-2 rounded w-96 cursor-pointer"
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                />
                <input
                    type="submit"
                    value="Subir archivo"
                    className="bg-black p-2 rounded my-4 cursor-pointer"
                />
            </form>
        </>
    );
}
