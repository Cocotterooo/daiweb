import { Dispatch, SetStateAction } from "react";
import { displayNavigationLink, NavigationLink } from "./NavigationLinksList";
import { IoIosArrowBack } from "react-icons/io";

type SideBarProps = {
    show: boolean;
    showSetter: Dispatch<SetStateAction<boolean>>;
};

const docsNavigationLinks: NavigationLink[] = [
    { href: "/docs/primeros-pasos", title: "Primeros pasos" },
    {
        href: "/docs/primeros-pasos",
        title: "Nuevo alumnado",
        children: [
            {
                href: "/docs/primeros-pasos/nuevo-alumnado",
                title: "Nuevo alumnado",
            },
        ],
    },
    { href: "/docs/prestamo-de-materiales", title: "Préstamo de materiales" },
    { href: "/docs/reserva-de-espacios", title: "Reserva de espacios" },
];

export default function SideBar({ show, showSetter }: SideBarProps) {
    const className =
        "bg-[#0c4d66] p-2 w-125 transition-[margin-right] ease-in-out duration-500 fixed md:static top-0 bottom-0 right-0 z-40";
    const appendClass = show ? " mr-0" : " mr-[-250px] md:mr-0";

    function ModalOverlay() {
        return (
            <div
                className="flex fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30"
                onClick={() => showSetter(!show)}
            ></div>
        );
    }

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div className="flex flex-row p-1 mb-5 rounded bg-black items-center justify-center cursor-pointer w-16 justify-self-end">
                    <IoIosArrowBack />
                    Atrás
                </div>
                <div className="flex">
                    <h3 className="mb-2 font-bold text-xl">Documentación</h3>
                </div>
                <div className="flex flex-col">
                    {docsNavigationLinks.map(
                        ({ href, title, children }, index) =>
                            displayNavigationLink(
                                { href, title, children },
                                showSetter,
                                index
                            )
                    )}
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    );
}
