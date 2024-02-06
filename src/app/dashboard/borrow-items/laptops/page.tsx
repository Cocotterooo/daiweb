import { AvailableItemsTable } from "@/components/InventoryItemsTable";
import { CustomText } from "@/components/CustomText";
import { currentUser } from "@clerk/nextjs";
import { getUserIdFromExternalId } from "@/database/user";
import { inventoryItems } from "@/database/inventoryItems";

export default async function LaptopsPage() {
    const user = await currentUser();
    if (!user || !user.id) {
        return null;
    }
    const userId = await getUserIdFromExternalId(user.id);
    if (!userId) {
        return null;
    }

    // TODO: If no items return an empty sign
    const items = await inventoryItems();
    if (!items) {
        return null;
    }

    return (
        <>
            <CustomText.h1>Préstamo de portátiles</CustomText.h1>
            <p>Busca y reserva un portátil</p>
            <h2 className="text-lg font-bold mt-4">Reserva de portátiles</h2>
            <AvailableItemsTable userId={userId} items={items} />
        </>
    );
}
