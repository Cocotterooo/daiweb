"use client";

import { CustomText } from "@/components/CustomText";
import { TextInput } from "@/components/TextInput";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyPage() {
    const router = useRouter();
    const { user, isLoaded, isSignedIn } = useUser();

    const [studentFullName, setStudentFullName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [file, setFile] = useState<File>();
    const [errored, setErrored] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (!isLoaded) {
        return null;
    }

    if (!user || !isSignedIn) {
        return null;
    }

    if (user.publicMetadata.studentIsVerified === true) {
        return (
            <>
                <CustomText.h1>Verificar tu cuenta</CustomText.h1>
                <p>
                    Tu cuenta está verificada. Estás listo para disfrutar de
                    todos los beneficios de la DAI.
                </p>
            </>
        );
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!(studentFullName && studentId)) {
            setErrored(true);
            setErrorMessage("Por favor, llena todas las cajitas en blanco.");
            return;
        }

        if (!file) {
            setErrored(true);
            setErrorMessage("Por favor, sube tu archivo de matrícula");
            return;
        }

        if (file.type !== "application/pdf") {
            setErrored(true);
            setErrorMessage("Solo son válidos archivos PDF.");
            return;
        }

        const data = new FormData();
        data.set("file", file);
        data.set("studentFullName", studentFullName);
        data.set("studentId", studentId);

        try {
            const response = await fetch("/api/verify-student", {
                method: "POST",
                body: data,
            });
            if (!response.ok) {
                setErrored(true);
                setErrorMessage(
                    "Algo salió mal. Por favor, vuelve a intentarlo más tarde."
                );
                return null;
            }
            console.log("Verificación correcta.");
        } catch (error: any) {
            setErrored(true);
            setErrorMessage(
                "Algo salió mal. Por favor, vuelve a intentarlo más tarde."
            );
            return null;
        }
    }

    return (
        <>
            <CustomText.h1>Verificar cuenta</CustomText.h1>
            <CustomText.h2>Sube tu matrícula</CustomText.h2>
            <p>
                No guardamos tus datos. Solo los utilizamos para verificar la
                validez de tu matrícula.
            </p>
            <div className="flex flex-col items-center justify-center">
                <form
                    onSubmit={onSubmit}
                    className="my-1.5 flex w-72 flex-col items-center"
                >
                    <TextInput
                        label="Tu nombre completo (como aparece en tu matrícula)"
                        htmlFor="text"
                        onChange={(element) => {
                            setErrored(false);
                            setErrorMessage("");
                            setStudentFullName(element.target.value);
                        }}
                        id="first-name"
                        name="first-name"
                        type="text"
                        placeholder="Nombres y apellidos"
                    />
                    <TextInput
                        label="Tu DNI con letra"
                        htmlFor="text"
                        onChange={(element) => {
                            setErrored(false);
                            setErrorMessage("");
                            setStudentId(element.target.value);
                        }}
                        id="dni"
                        name="dni"
                        type="text"
                        placeholder="DNI"
                    />
                    <input
                        className="my-1.5 p-2
                        file:m-1.5 file:mx-5
                        file:cursor-pointer file:rounded file:border-0
                        file:bg-black file:p-2 file:text-white
                        "
                        type="file"
                        name="file"
                        onChange={(element) => {
                            setErrored(false);
                            setErrorMessage("");
                            setFile(element.target.files?.[0]);
                        }}
                    />
                    <input
                        className="my-1.5 cursor-pointer rounded bg-black p-2"
                        type="submit"
                        value="Verificar cuenta"
                    />
                </form>
                {errored && errorMessage && (
                    <div className="my-4 flex items-center text-rose-500">
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
        </>
    );
}
