"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
    { href: "/docs/primeros-pasos", title: "Primeros pasos" },
    { href: "/docs/primeros-pasos/nuevo-alumnado", title: "Nuevo alumnado" },
    { href: "/docs/prestamo-de-materiales", title: "Préstamo de materiales" },
    { href: "/docs/reserva-de-espacios", title: "Reserva de espacios" },
];

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentPath = usePathname();
    return (
        <div className="flex mx-40">
            <div className="w-1/5 max-w-1/5 h-screen border-r border-grey py-8 pr-8">
                <div className="mb-4">
                    <Link
                        className="cursor-pointer hover:text-black font-bold text-xl"
                        href="/docs"
                    >
                        Documentación
                    </Link>
                </div>
                {navigationLinks.map(({ href, title }, index) => (
                    <ul key={index} className="flex flex-col my-2">
                        <Link
                            className="cursor-pointer hover:text-black font-bold mb-2"
                            href={href}
                        >
                            {title}
                        </Link>
                    </ul>
                ))}
            </div>
            <div className="pl-8 w-4/5 max-w-4/5">{children}</div>
        </div>
    );
}
