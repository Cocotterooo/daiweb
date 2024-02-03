"use client";

import SideBar from "@/components/SideBar";
import { NavigationLink } from "@/types";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const docsNavigationLinks: NavigationLink[] = [
    {
        href: "/docs/primeros-pasos",
        title: "Primeros pasos",
        children: [
            {
                href: "/docs/primeros-pasos/crear-cuenta-dai",
                title: "Crea tu cuenta DAI",
            },
            {
                href: "/docs/primeros-pasos/correo-uvigo",
                title: "Añadir el correo de la uvigo",
            },
            {
                href: "/docs/primeros-pasos/wifi",
                title: "Activar el WiFi",
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
                    title="Documentación"
                    links={docsNavigationLinks}
                    show={showSidebar}
                    showSetter={setShowSidebar}
                />
                <div className="flex flex-col w-full min-h-screen lg:ml-20">
                    {children}
                </div>
            </div>
        </div>
    );
}
