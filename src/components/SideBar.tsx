"use client";

import { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { NavigationLinks } from "./NavigationLinksList";
import { NavigationLink } from "@/types";

type SideBarProps = {
    links: NavigationLink[];
    show: boolean;
    showSetter: Dispatch<SetStateAction<boolean>>;
};

export default function SideBar({ links, show, showSetter }: SideBarProps) {
    const className =
        "bg-[#0c4d66] p-2 w-125 transition-[margin-right] ease-in-out duration-500 fixed md:static top-0 bottom-0 right-0 z-40";
    const appendClass = show ? " mr-0" : " mr-[-250px] md:mr-0";

    function ModalOverlay() {
        return (
            <div
                className="flex fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30"
                onClick={() => showSetter(!show)}
            ></div>
        );
    }

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div
                    className="flex flex-row p-1 mb-5 rounded bg-black items-center justify-center cursor-pointer w-16 justify-self-end"
                    onClick={() => showSetter(!show)}
                >
                    <IoIosArrowBack />
                    Atrás
                </div>
                <div className="flex">
                    <h3 className="mb-2 font-bold text-xl">Documentación</h3>
                </div>
                <div className="flex flex-col">
                    <NavigationLinks
                        links={links}
                        textStyleCallback={showSetter}
                    />
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    );
}
