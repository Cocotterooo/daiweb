import Image from "next/image";
import Link from "next/link";

export default function CommonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-full">
            <nav className="flex mb-2 py-1 items-center justify-between border-b border-grey">
                <ul className="flex items-center">
                    <Link href="/">
                        <Image
                            src="/logo-dai-blanco.svg"
                            alt="DAI logo"
                            width={50}
                            height={50}
                            priority
                        />
                    </Link>
                    <Link
                        href="/docs"
                        className="flex m-2 ml-4 p-1 rounded hover:bg-[#cfd1d3] hover:text-black"
                    >
                        Docs
                    </Link>
                    {/*
                    <Link
                        href="/blog"
                        className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black"
                    >
                        Blog
                    </Link>
                    */}
                    {/*
                    <Link
                        href="/contacto"
                        className="flex m-4 p-2 rounded hover:bg-[#cfd1d3] hover:text-black"
                    >
                        Contacto
                    </Link>
                    */}
                </ul>
                <ul className="flex">
                    <Link
                        href="/auth/sign-in"
                        className="flex items-center m-2 p-2 rounded-lg bg-[#1b1b1b] hover:bg-[#4f4f4f]"
                    >
                        Ingresar
                    </Link>
                    <Link
                        href="/auth/sign-up"
                        className="flex items-center my-2 ml-2 p-2 rounded-lg bg-[#db4646] hover:bg-[#872b2b]"
                    >
                        Crear cuenta
                    </Link>
                </ul>
            </nav>
            {children}
            <footer className="flex mt-10 pt-1 pb-5 flex-col items-center">
                <p>&copy;2024 DAI - Galicia, España</p>
            </footer>
        </div>
    );
}
