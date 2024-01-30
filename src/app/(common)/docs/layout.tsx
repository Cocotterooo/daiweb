"use client";

import SideBar from "@/components/SideBar";
import { NavigationLink } from "@/types";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

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
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="min-h-screen">
            <div className="flex-col grid lg:flex-row lg:flex">
                <div
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="flex flex-row p-1 mb-5 rounded bg-black items-center justify-center cursor-pointer w-24 justify-self-end lg:hidden"
                >
                    <p>Más docs</p>
                    <IoIosArrowForward size={20} />
                </div>
                <SideBar
                    links={docsNavigationLinks}
                    show={showSidebar}
                    showSetter={setShowSidebar}
                />
                <div className="flex flex-col w-full min-h-screen">
                    {children}
                </div>
            </div>
        </div>
    );
}
