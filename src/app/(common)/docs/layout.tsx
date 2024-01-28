"use client";

import SideBar from "@/components/SideBar";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showSidebar, setShowSidebar] = useState(false);

    function onClickShowMenu() {
        setShowSidebar(!showSidebar);
    }

    return (
        <div className="min-h-screen">
            <div className="flex flex-col grid">
                <div
                    onClick={onClickShowMenu}
                    className="flex flex-row p-1 mb-5 rounded bg-black items-center justify-center cursor-pointer w-24 justify-self-end"
                >
                    <p>Más docs</p>
                    <IoIosArrowForward size={20} />
                </div>
                <SideBar show={showSidebar} showSetter={setShowSidebar} />
                <div className="flex flex-col md:w-full min-h-screen">
                    {children}
                </div>
            </div>
        </div>
    );
}
