import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1 className="my-4 text-center text-4xl font-bold lg:text-start">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="my-4 text-2xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="my-4 text-xl font-bold">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="my-2 text-lg font-bold">{children}</h4>
        ),
        a: ({ children, href }) => (
            <a
                className="font-bold underline"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
        ol: ({ children }) => (
            <ol className="my-2 list-decimal pl-8">{children}</ol>
        ),
        ul: ({ children }) => (
            <ul className="my-2 list-disc pl-8">{children}</ul>
        ),
        li: ({ children }) => <li className="my-1">{children}</li>,
        code: ({ children }) => (
            <div className="my-4 rounded bg-zinc-800 p-4">
                <code className="">{children}</code>
            </div>
        ),
        table: ({ children }) => (
            <table className="my-4 table-auto border-0 p-2">{children}</table>
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
