import { MouseEventHandler } from "react";
import Link from "next/link";

type ChildMenuItemProps = {
    href: string;
    isActive: boolean;
    onClick: MouseEventHandler<HTMLAnchorElement>;
    title: string;
};

export function ChildMenuItem({
    title,
    href,
    onClick,
    isActive,
}: ChildMenuItemProps) {
    if (isActive) {
        return (
            <ActiveChildMenuItem title={title} href={href} onClick={onClick} />
        );
    }
    return (
        <InactiveChildMenuItem title={title} href={href} onClick={onClick} />
    );
}

type ActiveAndInactiveChildMenuItemProps = {
    href: string;
    onClick: MouseEventHandler<HTMLAnchorElement>;
    title: string;
};

function ActiveChildMenuItem({
    title,
    href,
    onClick,
}: ActiveAndInactiveChildMenuItemProps) {
    return (
        <ul className="my-2 flex flex-col pl-4">
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

function InactiveChildMenuItem({
    title,
    href,
    onClick,
}: ActiveAndInactiveChildMenuItemProps) {
    return (
        <ul className="my-2 flex flex-col pl-4">
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
