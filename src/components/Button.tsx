import { MouseEventHandler } from "react";

type ButtonProps = {
    title: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};
export function Button({ title, onClick }: ButtonProps) {
    return (
        <button
            className="rounded bg-black p-1.5 my-2.5 w-full"
            onClick={onClick}
        >
            {title}
        </button>
    );
}
