import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import QRCode from "qrcode";
import { CustomText } from "@/components/CustomText";
import { isUserVerified } from "@/database/user";

export default async function QRCodePage() {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    if (!(await isUserVerified(user.id))) {
        return (
            <>
                <CustomText.h1>Mi código QR</CustomText.h1>
                <p>
                    Por favor, verifica tu usuario para que puedas generar tu
                    código QR.
                </p>
                <div className="flex flex-col items-center">
                    <Link
                        href="/dashboard/verify"
                        className="my-4 max-w-fit rounded bg-black p-2"
                    >
                        Verificar usuario
                    </Link>
                </div>
            </>
        );
    }

    // TODO: Will need to parse public metadata in the future ?
    if (user.publicMetadata.studentVerified === "false") {
        return null;
    }

    async function QRCodeSource(text: string) {
        return await QRCode.toDataURL(text, {
            errorCorrectionLevel: "H",
            type: "image/jpeg",
            margin: 2,
            color: {
                dark: "#010599FF",
                light: "#FFBF60FF",
            },
            rendererOpts: {
                quality: 0.93,
            },
        });
    }

    return (
        <>
            <CustomText.h1>Mi código QR</CustomText.h1>
            <p>
                Muestra este código en la sede de la DAI para solicitar algún
                préstamo.
            </p>
            <div className="flex flex-col items-center justify-center">
                <div className="my-4">
                    <Image
                        priority
                        src={await QRCodeSource(btoa(user.id))}
                        height={200}
                        width={200}
                        alt="Your QR code"
                        quality={1}
                    />
                </div>
                <p>
                    ¿No sabes cómo funcionan los nuevos códigos QR? {""}
                    <Link
                        href="/docs/prestamo-de-materiales"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 underline"
                    >
                        Haz click aquí
                    </Link>
                </p>
            </div>
        </>
    );
}
