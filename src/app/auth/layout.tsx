"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isSignedIn } = useAuth();

    if (isSignedIn) {
        return <>{children}</>;
    }

    return (
        <div>
            <nav className="border-grey mb-10 flex items-center justify-start border-b py-1">
                <Link href="/">
                    <Image
                        className="my-2"
                        src="/logo-dai-blanco.svg"
                        alt="DAI logo"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
            </nav>
            {children}
        </div>
    );
}
