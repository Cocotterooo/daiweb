"use client";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { isStudentEmail } from "@/utils/email";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getClerErrorMessage } from "@/utils/clerkError";

export default function ForgotPasswordPage() {
    const { isLoaded, signIn, setActive } = useSignIn();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [code, setCode] = useState("");
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [complete, setComplete] = useState(false);
    const [secondFactor, setSecondFactor] = useState(false);

    const [errored, setErrored] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { replace } = useRouter();

    if (!isLoaded) {
        return null;
    }

    async function create(event: FormEvent) {
        event.preventDefault();

        if (!email) {
            setErrored(true);
            setErrorMessage("Por favor, ingresa tu correo de la uvigo.");
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
            await signIn?.create({
                strategy: "reset_password_email_code",
                identifier: email,
            });
            alert(
                "¡Genial! Te llegará un correo electrónico con un código con el que podrás cambiar tu contraseña"
            );
            setSuccessfulCreation(true);
        } catch (error: any) {
            const errorMessage = getClerErrorMessage(error.errors[0]);
            if (!errorMessage) {
                console.error(error.errors[0]);
                return;
            }
            setErrored(true);
            setErrorMessage(errorMessage);
            return;
        }
    }

    async function reset(event: FormEvent) {
        event.preventDefault();

        if (!(code && password && passwordConfirmation)) {
            setErrored(true);
            setErrorMessage("Por favor, llena todas las cajitas en blanco.");
            return;
        }

        if (password !== passwordConfirmation) {
            alert("Your passwords dont match");
            return;
        }

        try {
            const result = await signIn?.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code,
                password,
            });
            if (!result) {
                return;
            }

            if (result.status !== "complete") {
                console.log(result);
                return;
            }
            setActive!({ session: result.createdSessionId });
            setComplete(true);

            replace("/auth/sign-in");
        } catch (error: any) {
            // TODO: Fix possible error here: "Too many failed attempts."
            const errorMessage = getClerErrorMessage(error.errors[0]);
            if (!errorMessage) {
                console.error(error.errors[0]);
                return;
            }
            setErrored(true);
            setErrorMessage(errorMessage);
            return;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center mt-12">
            <div className="mb-3.5">
                <h1 className="text-xl font-bold">¿Olvidaste tu contraseña?</h1>
            </div>
            <form
                className="flex flex-col items-center my-1.5 w-60"
                onSubmit={!successfulCreation ? create : reset}
            >
                {!successfulCreation && !complete && (
                    <>
                        <TextInput
                            label="¿Cuál es tu correo uvigo?"
                            htmlFor="email"
                            onChange={(element) => {
                                setErrored(false);
                                setErrorMessage("");
                                setEmail(element.target.value);
                            }}
                            value={email}
                            placeholder="harrypotter@alumnos.uvigo.es"
                            id="email"
                            type="email"
                            name="email"
                        />
                        <Button title="Continúa" />
                    </>
                )}
                {successfulCreation && !complete && (
                    <>
                        <TextInput
                            label="Código"
                            htmlFor="reset password code"
                            onChange={(element) => {
                                setErrored(true);
                                setErrorMessage("");
                                setCode(element.target.value);
                            }}
                            type="text"
                            id="reset-password-code"
                            name="reset password code"
                            placeholder="Código"
                        />
                        <TextInput
                            label="Tu nueva contraseña"
                            htmlFor="password"
                            onChange={(element) => {
                                setErrored(true);
                                setErrorMessage("");
                                setPassword(element.target.value);
                            }}
                            value={password}
                            type="password"
                            id="reset-password"
                            name="reset-password"
                            placeholder="Crea una nueva contraseña"
                        />
                        <TextInput
                            label="Confirma tu nueva contraseña"
                            htmlFor="password"
                            onChange={(element) => {
                                setErrored(true);
                                setErrorMessage("");
                                setPasswordConfirmation(element.target.value);
                            }}
                            value={passwordConfirmation}
                            type="password"
                            id="reset-password-confirmation"
                            name="reset-password"
                            placeholder="Confirma tu contraseña"
                        />
                        <Button title="Cambiar contraseña" />
                    </>
                )}
            </form>
            {errored && (
                <div className="flex items-center text-rose-500 my-4">
                    <p>{errorMessage}</p>
                </div>
            )}
            <div className="flex flex-row mb-2">
                <p>¿Recuerdas tu contraseña?&nbsp;</p>
                <Link href="/auth/sign-in" className="underline text-rose-300">
                    Ingresa sesión
                </Link>
            </div>
            <div className="flex flex-row">
                <p>¿Todavía no tienes una cuenta?&nbsp;</p>
                <Link href="/auth/sign-up" className="underline text-rose-300">
                    Crea una
                </Link>
            </div>
        </div>
    );
}
