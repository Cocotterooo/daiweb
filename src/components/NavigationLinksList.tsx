"use client";

import { SetStateAction } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export type NavigationLink = {
    href: string;
    title: string;
    children?: NavigationLink[];
};

export function displayNavigationLink(
    { href, title, children }: NavigationLink,
    textStyleCallback: (value: SetStateAction<boolean>) => void,
    index: number
): React.ReactNode {
    const pathName = usePathname();
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
        displayNavigationLink(
            { href, title, children },
            textStyleCallback,
            jindex
        )
    );
}
