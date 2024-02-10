"use client";

import { useUser } from "@clerk/nextjs";

type BookItemProps = {
    itemId: number;
    action: (externalUserId: string, itemId: number) => Promise<boolean>;
};

export function BookItem({ itemId, action }: BookItemProps) {
    const { user } = useUser();

    if (!user) {
        return null;
    }

    async function onClickBookButton(itemId: number, user: string) {
        const isBooked = await action(user, itemId);
        if (!isBooked) {
            console.error(isBooked);
        }
        console.log("is booked");
    }

    return (
        <>
            <button
                className="invisible my-2 flex w-24 items-center justify-center rounded bg-black p-2 group-hover:visible"
                onClick={async () => await onClickBookButton(itemId, user.id)}
            >
                Reservar
            </button>
        </>
    );
}
