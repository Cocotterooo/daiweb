"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { IoIosArrowBack } from "react-icons/io";
import { isStudentEmail } from "@/utils/email";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
import { getClerErrorMessage } from "@/utils/clerkError";

export default function SignUpPage() {
    const router = useRouter();
    const { isLoaded, signUp, setActive } = useSignUp();

    const [email, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");

    const [errored, setErrored] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!isLoaded) {
            return;
        }

        if (!(email && password && passwordConfirmation)) {
            setErrored(true);
            setErrorMessage("Por favor, llena todas las cajitas en blanco.");
            return;
        }

        if (!isStudentEmail(email)) {
            setErrored(true);
            setErrorMessage("Solo son válidos correos asociados a la uvigo.");
            return;
        }

        if (password !== passwordConfirmation) {
            setErrored(true);
            setErrorMessage("Tus contraseñas no coinciden.");
            return;
        }

        try {
            await signUp.create({
                emailAddress: email,
                password,
            });
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

        try {
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            setPendingVerification(true);
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
    };

    const onPressVerify = async (event: FormEvent) => {
        event.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code,
                }
            );
            if (completeSignUp.status !== "complete") {
                console.log(JSON.stringify(completeSignUp, null, 2));
            }
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/dashboard");
            }
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
    };

    return (
        <div className="flex flex-col items-center justify-center mt-12">
            <div className="mb-3.5">
                <h1 className="text-4xl font-bold">Crea tu cuenta</h1>
            </div>
            {!pendingVerification && (
                <div className="flex flex-col items-center justify-center">
                    <form
                        className="flex flex-col items-center my-1.5 w-60"
                        onSubmit={handleSubmit}
                    >
                        <TextInput
                            label="Correo uvigo"
                            htmlFor="email"
                            onChange={(element) => {
                                setErrored(false);
                                setErrorMessage("");
                                setEmailAddress(element.target.value);
                            }}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="harrypotter@alumnos.uvigo.es"
                        />
                        <TextInput
                            htmlFor="password"
                            label="Tu nueva contraseña"
                            onChange={(element) =>
                                setPassword(element.target.value)
                            }
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Crea una contraseña"
                        />
                        <TextInput
                            htmlFor="password"
                            label="Confirma tu nueva contraseña"
                            onChange={(element) =>
                                setPasswordConfirmation(element.target.value)
                            }
                            id="password-confirmation"
                            name="password confirmation"
                            type="password"
                            placeholder="Confirma tu contraseña"
                        />
                        <Button title="Empieza" />
                    </form>
                </div>
            )}
            {pendingVerification && (
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full flex-start">
                        <button
                            onClick={() => {
                                setPendingVerification(false);
                                setEmailAddress("");
                                setPassword("");
                                setCode("");
                            }}
                        >
                            <div className="flex flex-row items-center">
                                <IoIosArrowBack color="white" size={20} />
                                <p>&nbsp;Atrás</p>
                            </div>
                        </button>
                    </div>
                    <form className="flex flex-col my-1.5 w-60">
                        <TextInput
                            value={code}
                            htmlFor="verification-code"
                            label="Código"
                            placeholder="Código de verificación"
                            id="verification-code"
                            name="verficacion-code"
                            onChange={(e) => setCode(e.target.value)}
                            type="text"
                        />
                        <Button onClick={onPressVerify} title="Verify Email" />
                    </form>
                </div>
            )}
            {errored && (
                <div className="flex items-center text-rose-500 my-4">
                    <p>{errorMessage}</p>
                </div>
            )}
            <div className="flex flex-row">
                <p>¿Ya tienes una cuenta?&nbsp;</p>
                <Link href="/auth/sign-in" className="underline text-rose-300">
                    Ingresa
                </Link>
            </div>
        </div>
    );
}
