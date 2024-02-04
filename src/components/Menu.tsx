"use client";

import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import SideBar from "@/components/SideBar";
import { MenuItemLink } from "@/types";

type MenuProps = {
    title: string;
    titleHref: string;
    menuItemLinks: MenuItemLink[];
};
export function Menu({ title, titleHref,menuItemLinks }: MenuProps) {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div
                onClick={() => setShowSidebar(!showSidebar)}
                className="flex flex-row p-1 mb-5 rounded bg-black items-center justify-center cursor-pointer w-24 justify-self-end lg:hidden"
            >
                <p>Más docs</p>
                <IoIosArrowForward size={20} />
            </div>
            <SideBar
                title={title}
                titleHref={titleHref}
                links={menuItemLinks}
                show={showSidebar}
                showSetter={setShowSidebar}
            />
        </>
    );
}
