import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <nav className="flex mb-10 items-center justify-between border-b border-grey">
                <Link href="/">
                    <Image
                        className="my-5"
                        src="/logo-dai-blanco.svg"
                        alt="DAI logo"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
                <UserButton afterSignOutUrl="/" />
            </nav>
            <div className="flex justify-center">
                <div className="flex flex-row my-4 items-center justify-between">
                    <Link
                        className="bg-black rounded-lg p-2 m-4"
                        href="/dashboard/qr-code"
                    >
                        Ver mi código QR
                    </Link>
                    <Link
                        className="bg-black rounded-lg p-2 m-4"
                        href="/dashboard/borrowed-items"
                    >
                        Ver mis préstamos
                    </Link>
                </div>
            </div>
            {children}
        </div>
    );
}
