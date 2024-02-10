import { Menu } from "@/components/Menu";
import { MenuItemInfo } from "@/types";

const docsMenuLinks: MenuItemInfo[] = [
    {
        title: "Primeros pasos",
        children: [
            {
                href: "/docs/primeros-pasos/crear-cuenta-dai",
                title: "Crea tu cuenta DAI",
                isChild: true,
            },
            {
                href: "/docs/primeros-pasos/correo-uvigo",
                title: "Añadir el correo de la uvigo",
                isChild: true,
            },
            {
                href: "/docs/primeros-pasos/wifi",
                title: "Activar el WiFi",
                isChild: true,
            },
        ],
    },
    { href: "/docs/prestamo-de-materiales", title: "Préstamo de materiales" },
    { href: "/docs/reserva-de-espacios", title: "Reserva de espacios" },
];

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-full">
            <div className="grid flex-col lg:flex lg:flex-row">
                <Menu
                    title="Documentación"
                    titleHref="/docs"
                    menuItemLinks={docsMenuLinks}
                />
                <div className="flex min-h-full flex-col">{children}</div>
            </div>
        </div>
    );
}
