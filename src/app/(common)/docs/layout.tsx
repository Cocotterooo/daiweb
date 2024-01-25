"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

    const displayNavigationLink = (
        { href, title, children }: NavigationLink,
        index: number
    ): React.ReactNode => {
        let linkTextStyle = "hover:text-black"
        if (currentPath === href) {
            linkTextStyle = "text-black"
        }

        if (!children || children.length === 0) {
            return (
                <ul key={index} className="flex flex-col my-2">
                    <Link
                        className={`cursor-pointer font-bold mb-2 ${linkTextStyle}`}
                        href={href}
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
                {docsNavigationLinks.map(({ href, title, children }, index) =>
                    displayNavigationLink({ href, title, children }, index)
                )}
            </div>
            <div className="pl-8 w-4/5 max-w-4/5">{children}</div>
        </div>
    );
}
