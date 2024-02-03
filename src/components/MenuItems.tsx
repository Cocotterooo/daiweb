"use client";

import { MouseEventHandler, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavigationLink } from "@/types";

type NavigationLinksProps = {
    links: NavigationLink[];
    textStyleCallback: (value: SetStateAction<boolean>) => void;
};

type MenuItemProps = {
    title: string;
    href: string;
    key?: number | undefined;
    className?: string | undefined;
    onClick: MouseEventHandler<HTMLAnchorElement>;
};

export function MenuItem({
    title,
    href,
    key,
    className,
    onClick,
}: MenuItemProps) {
    return (
        <ul key={key} className="flex flex-col my-2">
            <Link
                className={`cursor-pointer font-bold mb-2 ${className}`}
                href={href}
                onClick={onClick}
            >
                {title}
            </Link>
        </ul>
    );
}

export function MenuItems({ links, textStyleCallback }: NavigationLinksProps) {
    const pathName = usePathname();

    function displayMenuItems(
        { href, title, children }: NavigationLink,
        textStyleCallback: (value: SetStateAction<boolean>) => void,
        index: number,
        className?: string | undefined
    ): React.ReactNode {
        let itemClassName = "hover:text-black";
        if (href === pathName) {
            itemClassName = "text-black";
        }

        if (!children || children.length === 0) {
            return (
                <MenuItem
                    key={index}
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
                    key={index}
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
                            (className = `${className} pl-4`)
                        )
                    )}
                </>
            </>
        );
    }

    return (
        <>
            {links.map(({ href, title, children }, index) =>
                displayMenuItems(
                    { href, title, children },
                    textStyleCallback,
                    index
                )
            )}
        </>
    );
}
