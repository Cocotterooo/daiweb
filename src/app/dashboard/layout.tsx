"use client";

import SideBar from "@/components/SideBar";
import { NavigationLink } from "@/types";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const dashboardNavigationLinks: NavigationLink[] = [
    { href: "/dashboard/home", title: "Inicio" },
    { href: "/dashboard/qr-code", title: "Mi código QR" },
    {
        href: "/dashboard/borrow-items",
        title: "Préstamo de materiales",
        children: [
            {
                href: "/dashboard/borrow-items/laptops",
                title: "Préstamo de portátiles",
            },
            {
                href: "/dashboard/borrow-items/other",
                title: "Préstamo de otros materiales",
            },
        ],
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <div className="min-h-screen">
            <nav className="flex mb-5 items-center justify-between border-b border-grey">
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
            <div className="flex-col grid lg:flex-row lg:flex">
                <div
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="flex flex-row p-1 mb-5 rounded bg-black items-center justify-center cursor-pointer w-24 justify-self-end lg:hidden"
                >
                    <p>Menú</p>
                    <IoIosArrowForward size={20} />
                </div>
                <SideBar
                    links={dashboardNavigationLinks}
                    show={showSidebar}
                    showSetter={setShowSidebar}
                />
                <div className="flex flex-col w-full lg:ml-20">{children}</div>
            </div>
        </div>
    );
}
