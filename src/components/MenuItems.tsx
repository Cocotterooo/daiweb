"use client";

import { usePathname } from "next/navigation";
import { MenuItemLink } from "@/types";
import { SetStateAction } from "react";
import { MenuItem } from "./MenuItem";
import { Fragment } from "react";

// This function makes me feel sad. Can I do better than this?
function displayMenuItems(
    { href, title, children }: MenuItemLink,
    textStyleCallback: (value: SetStateAction<boolean>) => void,
    pathname: string,
    className?: string | undefined
): React.ReactNode {
    let itemClassName = "hover:text-black";
    if (href === pathname) {
        itemClassName = "text-black";
    }

    const keyArray = new Uint8Array(5);
    crypto.getRandomValues(keyArray);
    if (!children || children.length === 0) {
        return (
            <MenuItem
                key={keyArray.join("")}
                className={`${itemClassName} ${className}`}
                title={title}
                href={href}
                onClick={() => textStyleCallback((oldVal) => !oldVal)}
            />
        );
    }

    return (
        <Fragment key={keyArray.join("")}>
            <MenuItem
                className={`${className}`}
                title={title}
                href={href}
                onClick={() => textStyleCallback((oldVal) => !oldVal)}
            />
            <>
                {children.map(({ href, title, children }) =>
                    displayMenuItems(
                        { href, title, children },
                        textStyleCallback,
                        pathname,
                        (className = `${className} pl-4`)
                    )
                )}
            </>
        </Fragment>
    );
}

type MenuItemsProps = {
    links: MenuItemLink[];
    textStyleCallback: (value: SetStateAction<boolean>) => void;
};

export function MenuItems({ links, textStyleCallback }: MenuItemsProps) {
    const pathname = usePathname();

    return (
        <>
            {links.map(({ href, title, children }) =>
                displayMenuItems(
                    { href, title, children },
                    textStyleCallback,
                    pathname
                )
            )}
        </>
    );
}
