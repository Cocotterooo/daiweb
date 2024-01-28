"use client";

import { SetStateAction } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavigationLink } from "@/types";

type NavigationLinksProps = {
    links: NavigationLink[];
    textStyleCallback: (value: SetStateAction<boolean>) => void;
};

export function NavigationLinks({
    links,
    textStyleCallback,
}: NavigationLinksProps) {
    const pathName = usePathname();

    function displayLinks(
        { href, title, children }: NavigationLink,
        textStyleCallback: (value: SetStateAction<boolean>) => void,
        index: number
    ): React.ReactNode {
        let linkTextStyle = "hover:text-black";
        if (href === pathName) {
            linkTextStyle = "text-black";
        }
        if (!children || children.length === 0) {
            return (
                <ul key={index} className="flex flex-col my-2">
                    <Link
                        className={`cursor-pointer font-bold mb-2 ${linkTextStyle}`}
                        href={href}
                        onClick={() => textStyleCallback((oldVal) => !oldVal)}
                    >
                        {title}
                    </Link>
                </ul>
            );
        }
        return children.map(({ href, title, children }, jindex) =>
            displayLinks({ href, title, children }, textStyleCallback, jindex)
        );
    }

    return (
        <>
            {links.map(({ href, title, children }, index) =>
                displayLinks(
                    { href, title, children },
                    textStyleCallback,
                    index
                )
            )}
        </>
    );
}
