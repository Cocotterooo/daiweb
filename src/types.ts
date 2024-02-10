export type MenuItemInfo = {
    title: string;
    children?: MenuItemInfo[];
    href?: string | undefined;
    isChild?: boolean | undefined;
};
