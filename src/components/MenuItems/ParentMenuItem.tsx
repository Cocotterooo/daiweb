type ParentMenuItemProps = {
    title: string;
};

export function ParentMenuItem({ title }: ParentMenuItemProps) {
    return (
        <ul className="my-2 flex flex-col">
            <p className="font-bold">{title}</p>
        </ul>
    );
}
