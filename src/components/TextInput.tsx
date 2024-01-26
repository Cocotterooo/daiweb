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
}: TextInputProps): JSX.Element {
    return (
        <div className="flex flex-col my-1.5 min-w-full">
            <label htmlFor={htmlFor}>{label}</label>
            <input
                className="my-0.5 rounded text-black py-0.5 px-1.5 bg-[#f2f2f2]"
                onChange={onChange}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
            />
        </div>
    );
}
