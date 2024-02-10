import { Menu } from "@/components/Menu";
import { MenuItemInfo } from "@/types";
import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const dashboardNavigationLinks: MenuItemInfo[] = [
    { href: "/dashboard/qr-code", title: "Mi código QR" },
    {
        title: "Préstamo de materiales",
        children: [
            {
                href: "/dashboard/borrow-items/laptops",
                title: "Préstamo de portátiles",
                isChild: true,
            },
            {
                href: "/dashboard/borrow-items/other",
                title: "Préstamo de otros materiales",
                isChild: true,
            },
        ],
    },
    {
        href: "/dashboard/verify",
        title: "Verificar cuenta",
    },
];

const adminNavigationLinks: MenuItemInfo[] = [
    {
        href: "/dashboard/admin/lend-items",
        title: "Prestar ordenador",
    },
];

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    const menuLinks = dashboardNavigationLinks;

    return (
        <div className="min-h-screen">
            <nav className="border-grey mb-5 flex items-center justify-between border-b">
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
            <div className="grid flex-col lg:flex lg:flex-row">
                <Menu
                    title="Dashboard"
                    titleHref="/dashboard"
                    menuItemLinks={dashboardNavigationLinks}
                />
                <div className="flex flex-col">{children}</div>
            </div>
        </div>
    );
}
