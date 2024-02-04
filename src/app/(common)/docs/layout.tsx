import { Menu } from "@/components/Menu";
import { MenuItemLink } from "@/types";

const docsMenuLinks: MenuItemLink[] = [
    {
        href: "/docs/primeros-pasos",
        title: "Primeros pasos",
        children: [
            {
                href: "/docs/primeros-pasos/crear-cuenta-dai",
                title: "Crea tu cuenta DAI",
            },
            {
                href: "/docs/primeros-pasos/correo-uvigo",
                title: "Añadir el correo de la uvigo",
            },
            {
                href: "/docs/primeros-pasos/wifi",
                title: "Activar el WiFi",
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
        <div className="min-h-screen">
            <div className="flex-col grid lg:flex-row lg:flex">
                <Menu title="Documentación" titleHref="/docs" menuItemLinks={docsMenuLinks} />
                <div className="flex flex-col w-full min-h-screen lg:ml-20">
                    {children}
                </div>
            </div>
        </div>
    );
}
