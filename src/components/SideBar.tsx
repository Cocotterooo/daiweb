"use client";

import { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MenuItems } from "./MenuItems/MenuItems";
import { MenuItemInfo } from "@/types";
import Link from "next/link";

type SideBarProps = {
    links: MenuItemInfo[];
    show: boolean;
    showSetter: Dispatch<SetStateAction<boolean>>;
    title?: string | undefined;
    titleHref?: string | undefined;
};

export default function SideBar({
    title,
    titleHref,
    links,
    show,
    showSetter,
}: SideBarProps) {
    const className =
        "bg-[#0c4d66] px-2 w-[18rem] transition-[margin-right] ease-in-out duration-500 fixed md:static top-0 bottom-0 right-0 z-40 lg:bg-transparent lg:w-[20rem] lg:mr-4";
    const appendClass = show ? " mr-0" : " mr-[-18rem] md:mr-0";

    function ModalOverlay() {
        return (
            <div
                className="fixed bottom-0 left-0 right-0 top-0 z-30 flex bg-black/50 lg:hidden"
                onClick={() => showSetter(!show)}
            ></div>
        );
    }

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div
                    className="mb-4 ml-4 mt-2 flex w-6 cursor-pointer justify-center rounded bg-black p-1 lg:hidden"
                    onClick={() => showSetter(!show)}
                >
                    <IoIosArrowBack />
                </div>
                {title && titleHref && (
                    <div className="mb-2 ml-4">
                        <Link href={titleHref} className="text-xl font-bold">
                            {title}
                        </Link>
                    </div>
                )}
                <div className="ml-4 flex flex-col">
                    <MenuItems links={links} textStyleCallback={showSetter} />
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    );
}
