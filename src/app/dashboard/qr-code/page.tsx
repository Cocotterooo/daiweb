import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import QRCode from "qrcode";

export default async function QRCodePage() {
    const user = await currentUser();

    if (!user) {
        return null
    }

    // TODO: Will need to parse public metadata in the future ?
    if (user.publicMetadata.studentVerified === "false") {
        return null;
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="my-4">
                <Image
                    priority
                    src={await QRCode.toDataURL(btoa(user.id), {
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
                    })}
                    height={200}
                    width={200}
                    alt="Your QR code"
                    quality={1}
                />
            </div>
            <p className="text-center">
                Muestra este código en la sede de la DAI para solicitar algún
                préstamo.
            </p>
            <Link href="/docs/prestamo-de-materiales" className="bg-black p-2 my-4 rounded-lg">
                Más información
            </Link>
        </div>
    );
}
