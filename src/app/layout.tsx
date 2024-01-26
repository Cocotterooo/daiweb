import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    title: "DAI uvigo",
    description:
        "Página web de la Delegación de Alumnos de la Escuela de Ingeniería Industrial de la Universidad de Vigo",
    authors: {
        name: "Axel Rodríguez Chang",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider afterSignInUrl="/dashboard" localization={esES}>
            <html lang="es" className="bg-[#1B669A]">
                <head>
                    <link
                        rel="icon"
                        href="/icon.svg"
                        type="image/svg+xml"
                        sizes="any"
                    />
                    <meta charSet="UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                </head>
                <body
                    className={`${inter.className} min-h-screen px-5 bg-[#1B669A] text-sm text-white`}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
