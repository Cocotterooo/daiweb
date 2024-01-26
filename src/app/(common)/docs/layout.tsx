"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosCloseCircleOutline, IoIosMenu } from "react-icons/io";

type NavigationLink = {
    href: string;
    title: string;
    children?: NavigationLink[];
};

const docsNavigationLinks: NavigationLink[] = [
    { href: "/docs/primeros-pasos", title: "Primeros pasos" },
    {
        href: "/docs/primeros-pasos",
        title: "Nuevo alumnado",
        children: [
            {
                href: "/docs/primeros-pasos/nuevo-alumnado",
                title: "Nuevo alumnado",
            },
        ],
    },
    { href: "/docs/prestamo-de-materiales", title: "Préstamo de materiales" },
    { href: "/docs/reserva-de-espacios", title: "Reserva de espacios" },
];

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentPath = usePathname();

    const [showMenu, setShowMenu] = useState(false);

    const displayNavigationLink = (
        { href, title, children }: NavigationLink,
        index: number
    ): React.ReactNode => {
        let linkTextStyle = "hover:text-black";
        if (currentPath === href) {
            linkTextStyle = "text-black";
        }

        if (!children || children.length === 0) {
            return (
                <ul key={index} className="flex flex-col my-2">
                    <Link
                        className={`cursor-pointer font-bold mb-2 ${linkTextStyle}`}
                        href={href}
                        onClick={() => setShowMenu(false)}
                    >
                        {title}
                    </Link>
                </ul>
            );
        }
        return children.map(({ href, title, children }, jindex) =>
            displayNavigationLink({ href, title, children }, jindex)
        );
    };

    return (
        <div className="flex flex-col items-end min-h-screen">
            {!showMenu && (
                <button onClick={() => setShowMenu(true)} onTouchStart={() => setShowMenu(true)}>
                    <IoIosMenu size={24} />
                </button>
            )}
            {showMenu && (
                <div className="flex flex-col z-50 bg-[#1B669A] w-full min-h-screen">
                    <div className="flex mb-4 items-center justify-between">
                        <Link
                            className="cursor-pointer hover:text-black font-bold text-xl"
                            href="/docs"
                        >
                            Documentación
                        </Link>
                        <button onClick={() => setShowMenu(false)} type="button" className="cursor-pointer">
                            <IoIosCloseCircleOutline size={24} />
                        </button>
                    </div>
                    {docsNavigationLinks.map(
                        ({ href, title, children }, index) =>
                            displayNavigationLink(
                                { href, title, children },
                                index
                            )
                    )}
                </div>
            )}
            {!showMenu && <div className="absolute mx-5 z-0">{children}</div>}
        </div>
    );
}
