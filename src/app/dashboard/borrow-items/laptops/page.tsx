import { InventoryLaptopsTable } from "@/components/InventoryItemsTable";
import { CustomText } from "@/components/CustomText";

export default async function LaptopsPage() {
    return (
        <>
            <CustomText.h1>Préstamo de portátiles</CustomText.h1>
            <p>Busca y reserva un portátil</p>
            <h2 className="text-lg font-bold mt-4">Reserva de portátiles</h2>
            <InventoryLaptopsTable />
        </>
    );
}
