"use client";

import { usePathname } from "next/navigation";
import { MenuItemInfo } from "@/types";
import { SetStateAction } from "react";
import { Fragment } from "react";
import { ChildMenuItem } from "./ChildMenuItem";
import { ParentMenuItem } from "./ParentMenuItem";
import { TopMenuItem } from "./TopMenuItem";

// This function makes me feel sad. Can I do better than this?
function displayMenuItems(
    { href, title, children, isChild }: MenuItemInfo,
    textStyleCallback: (value: SetStateAction<boolean>) => void,
    pathname: string,
    className?: string | undefined
): React.ReactNode {
    const isMenuItemActive = href === pathname;
    const keyArray = new Uint8Array(5);
    crypto.getRandomValues(keyArray);

    if (!children || children.length === 0) {
        if (!isChild) {
            return (
                <TopMenuItem
                    key={keyArray.join("")}
                    title={title}
                    href={href!}
                    isActive={isMenuItemActive}
                    onClick={() => textStyleCallback((oldVal) => !oldVal)}
                />
            );
        }
        return (
            <ChildMenuItem
                key={keyArray.join("")}
                title={title}
                href={href!}
                isActive={isMenuItemActive}
                onClick={() => textStyleCallback((oldVal) => !oldVal)}
            />
        );
    }

    return (
        <Fragment key={keyArray.join("")}>
            {!href && <ParentMenuItem title={title} />}
            {href && (
                <ChildMenuItem
                    key={keyArray.join("")}
                    title={title}
                    href={href!}
                    isActive={isMenuItemActive}
                    onClick={() => textStyleCallback((oldVal) => !oldVal)}
                />
            )}
            <>
                {children.map(({ href, title, children, isChild }) =>
                    displayMenuItems(
                        { href, title, children, isChild },
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
    links: MenuItemInfo[];
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
