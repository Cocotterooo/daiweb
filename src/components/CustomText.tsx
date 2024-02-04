import React from "react";

type CustomTextProps = {
    children: React.ReactNode;
    className?: string | undefined;
};

export const CustomText = {
    h1: ({ children, className }: CustomTextProps) => (
        <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>
    ),
    h2: ({ children, className }: CustomTextProps) => (
        <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
    ),
};
