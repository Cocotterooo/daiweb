import { DefaultLayout } from "@/layouts/default-layout";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DefaultLayout>{children}</DefaultLayout>;
}