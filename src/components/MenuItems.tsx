"use client";

import { usePathname } from "next/navigation";
import { MenuItemLink } from "@/types";
import { SetStateAction } from "react";
import { MenuItem } from "./MenuItem";

type MenuItemsProps = {
    links: MenuItemLink[];
    textStyleCallback: (value: SetStateAction<boolean>) => void;
};

function displayMenuItems(
    { href, title, children }: MenuItemLink,
    textStyleCallback: (value: SetStateAction<boolean>) => void,
    index: number,
    pathname: string,
    className?: string | undefined
): React.ReactNode {
    let itemClassName = "hover:text-black";
    if (href === pathname) {
        itemClassName = "text-black";
    }

    if (!children || children.length === 0) {
        return (
            <MenuItem
                id={`${href}-${index}`}
                className={`${itemClassName} ${className}`}
                title={title}
                href={href}
                onClick={() => textStyleCallback((oldVal) => !oldVal)}
            />
        );
    }

    return (
        <>
            <MenuItem
                id={`${href}-${index}`}
                className={`${className}`}
                title={title}
                href={href}
                onClick={() => textStyleCallback((oldVal) => !oldVal)}
            />
            <>
                {children.map(({ href, title, children }, jindex) =>
                    displayMenuItems(
                        { href, title, children },
                        textStyleCallback,
                        jindex,
                        pathname,
                        (className = `${className} pl-4`)
                    )
                )}
            </>
        </>
    );
}

export function MenuItems({ links, textStyleCallback }: MenuItemsProps) {
    const pathname = usePathname();

    return (
        <>
            {links.map(({ href, title, children }, index) =>
                displayMenuItems(
                    { href, title, children },
                    textStyleCallback,
                    index,
                    pathname
                )
            )}
        </>
    );
}
