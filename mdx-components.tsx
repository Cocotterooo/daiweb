import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-center">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-bold my-4">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-bold my-4">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-lg font-bold my-2">{children}</h4>
        ),
        a: ({ children, href }) => (
            <a className="font-bold underline" href={href}>
                {children}
            </a>
        ),
        ol: ({ children }) => (
            <ol className="list-decimal pl-8 my-2">{children}</ol>
        ),
        ul: ({ children }) => (
            <ul className="list-disc pl-8 my-2">{children}</ul>
        ),
        li: ({ children }) => <li className="my-1">{children}</li>,
        code: ({ children }) => (
            <div className="my-4 p-4 rounded bg-zinc-800">
                <code className="">{children}</code>
            </div>
        ),
        table: ({ children }) => (
            <table className="table-auto my-4 p-2 border-0">{children}</table>
        ),
        thead: ({ children }) => <thead>{children}</thead>,
        th: ({ children }) => <th className="p-2 font-normal">{children}</th>,
        td: ({ children }) => <td className="p-2">{children}</td>,
        tr: ({ children }) => (
            <tr className="border border-solid p-2">{children}</tr>
        ),
        ...components,
    };
}
