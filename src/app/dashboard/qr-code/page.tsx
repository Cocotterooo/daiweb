import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import QRCode from "qrcode";
import { CustomText } from "@/components/CustomText";

export default async function QRCodePage() {
    const user = await currentUser();

    if (!user) {
        return null;
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
            <div className="flex flex-col justify-center items-center">
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
                        className="underline text-pink-400"
                    >
                        Haz click aquí
                    </Link>
                </p>
            </div>
        </>
    );
}
