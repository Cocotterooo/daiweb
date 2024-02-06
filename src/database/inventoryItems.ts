import database from "./client";

export async function inventoryItems() {
    const { data: inventory_items, error } = await database
        .from("inventory_item")
        .select("*")
        .eq("is_available", true)
        .eq("is_booked", false);
    if (error) {
        console.error(error);
        return null;
    }
    return inventory_items;
}
