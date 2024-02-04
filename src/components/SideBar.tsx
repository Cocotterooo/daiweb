"use client";

import { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MenuItems } from "./MenuItems";
import { MenuItemLink } from "@/types";
import Link from "next/link";

type SideBarProps = {
    links: MenuItemLink[];
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
        "bg-[#0c4d66] px-2 w-125 transition-[margin-right] ease-in-out duration-500 fixed md:static top-0 bottom-0 right-0 z-40 lg:bg-transparent";
    const appendClass = show ? " mr-0" : " mr-[-250px] md:mr-0";

    function ModalOverlay() {
        return (
            <div
                className="flex fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30 lg:hidden"
                onClick={() => showSetter(!show)}
            ></div>
        );
    }

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div
                    className="flex flex-row p-1 mb-5 rounded bg-black items-center justify-center cursor-pointer w-16 justify-self-end lg:hidden"
                    onClick={() => showSetter(!show)}
                >
                    <IoIosArrowBack />
                    Atrás
                </div>
                {title && titleHref && (
                    <div>
                        <Link href={titleHref} className="font-bold text-xl">
                            {title}
                        </Link>
                    </div>
                )}
                <div className="flex flex-col">
                    <MenuItems links={links} textStyleCallback={showSetter} />
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    );
}
