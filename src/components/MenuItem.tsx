import Link from "next/link";
import { MouseEventHandler } from "react";

type MenuItemProps = {
    title: string;
    href: string;
    className?: string | undefined;
    onClick: MouseEventHandler<HTMLAnchorElement>;
};

export function MenuItem({ title, href, className, onClick }: MenuItemProps) {
    return (
        <ul className="flex flex-col my-2">
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
