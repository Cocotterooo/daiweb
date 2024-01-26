"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/Button";
import { isStudentEmail } from "@/utils/email";

export default function SignInPage() {
    const router = useRouter();
    const { isLoaded, signIn, setActive } = useSignIn();
    const { isSignedIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errored, setErrored] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (!isLoaded) {
        return null;
    }

    if (isSignedIn) {
        router.replace("/dashboard");
    }

    async function submit(event: FormEvent) {
        event.preventDefault();
        if (!signIn) {
            return;
        }

        if (!(email && password)) {
            setErrored(true);
            setErrorMessage("Por favor, llena todas las cajitas en blanco.");
            return;
        }

        if (!isStudentEmail(email)) {
            setErrored(true);
            setErrorMessage(
                "Solo son válidos correos asociados a la uvigo."
            );
            return;
        }

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });
            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/dashboard");
            }
        } catch (error: any) {
            setErrored(true);
            setErrorMessage(
                "¡Ups! Algo salió mal. Por favor, revisa tu correo y contraseña."
            );
            return;
        }
    }

    return (
        <>
            {!isSignedIn && (
                <div className="flex flex-col items-center justify-center mt-12">
                    <div className="mb-3.5">
                        <h1 className="text-4xl font-bold">Ingresa sesión</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <form
                            className="flex flex-col items-center my-1.5 w-60"
                            onSubmit={submit}
                        >
                            <div className="flex flex-col my-1.5 w-60">
                                <label htmlFor="email">Correo</label>
                                <input
                                    className="my-0.5 rounded text-black py-0.5 px-1.5 bg-[#f2f2f2]"
                                    type="email"
                                    value={email}
                                    placeholder="Ingresa tu correo"
                                    onChange={(element) => {
                                        setErrored(false);
                                        setErrorMessage("");
                                        setEmail(element.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex flex-col my-1.5 w-60">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    className="my-0.5 rounded text-black py-0.5 px-1.5 bg-[#f2f2f2]"
                                    type="password"
                                    value={password}
                                    placeholder="Ingresa tu contraseña"
                                    onChange={(element) => {
                                        setErrored(false);
                                        setErrorMessage("");
                                        setPassword(element.target.value);
                                    }}
                                />
                            </div>
                            <Button onClick={submit} title="Continúa" />
                        </form>
                        {errored && (
                            <div className="flex items-center text-rose-500 my-4">
                                <p>{errorMessage}</p>
                            </div>
                        )}
                        <Link
                            href="/auth/forgot-password"
                            className="mb-3 underline text-rose-300"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <div className="flex flex-row">
                            <p>¿No tienes una cuenta?&nbsp;</p>
                            <Link
                                href="/auth/sign-up"
                                className="underline text-rose-300"
                            >
                                Créala
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
