"use client";

import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import SideBar from "@/components/SideBar";
import { MenuItemInfo } from "@/types";

type MenuProps = {
    title: string;
    titleHref: string;
    menuItemLinks: MenuItemInfo[];
};
export function Menu({ title, titleHref, menuItemLinks }: MenuProps) {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div
                onClick={() => setShowSidebar(!showSidebar)}
                className="mb-5 flex cursor-pointer items-center justify-center justify-self-end
                rounded bg-black p-1 lg:hidden"
            >
                <IoIosMenu size={20} />
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
