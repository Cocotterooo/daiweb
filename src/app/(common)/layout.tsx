import Image from "next/image";
import Link from "next/link";

export default function CommonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-full flex-col">
            <nav className="border-grey mb-2 flex items-center justify-between border-b py-1">
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
                        className="m-2 ml-4 flex rounded p-1 hover:bg-[#cfd1d3] hover:text-black"
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
                        className="m-2 flex items-center rounded-lg bg-[#1b1b1b] p-2 hover:bg-[#4f4f4f]"
                    >
                        Ingresar
                    </Link>
                    <Link
                        href="/auth/sign-up"
                        className="my-2 ml-2 flex items-center rounded-lg bg-[#db4646] p-2 hover:bg-[#872b2b]"
                    >
                        Crear cuenta
                    </Link>
                </ul>
            </nav>
            {children}
            <footer className="mt-10 flex flex-col items-center pb-5 pt-1">
                <p>&copy;2024 DAI - Galicia, España</p>
            </footer>
        </div>
    );
}
