import { Menu } from "@/components/Menu";
import { MenuItemLink } from "@/types";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const dashboardNavigationLinks: MenuItemLink[] = [
    { href: "/dashboard/qr-code", title: "Mi código QR" },
    {
        href: "/dashboard/borrow-items",
        title: "Préstamo de materiales",
        children: [
            {
                href: "/dashboard/borrow-items/laptops",
                title: "Préstamo de portátiles",
            },
            {
                href: "/dashboard/borrow-items/other",
                title: "Préstamo de otros materiales",
            },
        ],
    },
    {
        href: "/dashboard/verify",
        title: "Verificar cuenta",
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <nav className="flex mb-5 items-center justify-between border-b border-grey">
                <Link href="/">
                    <Image
                        className="my-5"
                        src="/logo-dai-blanco.svg"
                        alt="DAI logo"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
                <UserButton afterSignOutUrl="/" />
            </nav>
            <div className="flex-col grid lg:flex-row lg:flex">
                <Menu
                    title="Dashboard"
                    titleHref="/dashboard"
                    menuItemLinks={dashboardNavigationLinks}
                />
                <div className="flex flex-col w-full lg:ml-20">{children}</div>
            </div>
        </div>
    );
}
