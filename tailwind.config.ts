import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./mdx-components.tsx",
    ],
    plugins: [],
    theme: {
        extend: {
            colors: {
                "steel-blue": "#1b669a",
            },
            spacing: {
                "125": "15.625rem",
            },
        },
    },
};
export default config;
