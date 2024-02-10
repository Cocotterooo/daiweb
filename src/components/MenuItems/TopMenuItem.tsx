import { Linden_Hill } from "next/font/google";
import Link from "next/link";
import { MouseEventHandler } from "react";

type TopMenuItemProps = {
    href: string;
    isActive: boolean;
    onClick: MouseEventHandler<HTMLAnchorElement>;
    title: string;
};

export function TopMenuItem({
    title,
    href,
    onClick,
    isActive,
}: TopMenuItemProps) {
    if (isActive) {
        return (
            <ActiveTopMenuItem title={title} href={href} onClick={onClick} />
        );
    }
    return <InactiveTopMenuItem title={title} href={href} onClick={onClick} />;
}

type ActiveAndInactiveTopMenuItemProps = {
    href: string;
    onClick: MouseEventHandler<HTMLAnchorElement>;
    title: string;
};

function ActiveTopMenuItem({
    title,
    href,
    onClick,
}: ActiveAndInactiveTopMenuItemProps) {
    return (
        <ul className="my-2 flex flex-col">
            <Link
                className="cursor-pointer font-bold text-black"
                href={href}
                onClick={onClick}
            >
                {title}
            </Link>
        </ul>
    );
}

function InactiveTopMenuItem({
    title,
    href,
    onClick,
}: ActiveAndInactiveTopMenuItemProps) {
    return (
        <ul className="my-2 flex flex-col">
            <Link
                className="cursor-pointer font-bold hover:text-black"
                href={href}
                onClick={onClick}
            >
                {title}
            </Link>
        </ul>
    );
}
