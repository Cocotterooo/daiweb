"use server";

import database from "@/database/client";

export async function bookItem(externalUserId: string, itemId: number) {
    const { data: userData, error: userError } = await database
        .from("user")
        .select("id")
        .eq("external_user_id", externalUserId);
    if (userError) {
        return false;
    }
    const { error: updateItemBookingStatusError } = await database
        .from("inventory_item")
        .update({ is_booked: true })
        .eq("id", itemId);
    if (updateItemBookingStatusError) {
        console.error(updateItemBookingStatusError);
        return false;
    }

    const { error: bookingError } = await database
        .from("inventory_item_booking")
        .insert({ user_id: userData![0].id, item_id: itemId });
    if (bookingError) {
        console.error(bookingError);
        return false;
    }
    return true;
}
