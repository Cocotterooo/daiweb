import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

type TextInputProps = {
    id: string;
    label: string;
    name: string;
    onChange: ChangeEventHandler<HTMLInputElement> | undefined;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    htmlFor?: string | undefined;
    value?: string | number | readonly string[] | undefined;
    hidden?: boolean | undefined;
};

export function TextInput({
    htmlFor,
    id,
    label,
    name,
    onChange,
    placeholder,
    type,
    value,
    hidden,
}: TextInputProps): JSX.Element {
    return (
        <div className="my-1.5 flex min-w-full flex-col">
            <label htmlFor={htmlFor}>{label}</label>
            <input
                className="my-0.5 rounded px-1.5 py-0.5 text-black"
                onChange={onChange}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                hidden={hidden}
            />
        </div>
    );
}
