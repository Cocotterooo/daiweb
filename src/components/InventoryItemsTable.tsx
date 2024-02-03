import { dbclient } from "@/server/database";
import { getUniqueItemsFromArray } from "@/utils/arrayFuncs";
import { ObjectId } from "mongodb";

async function availableLaptops() {
    try {
        const inventoryCollection = (await dbclient())
            .db("inventory")
            .collection("items");
        const availableItems = await inventoryCollection
            .find({ available: true, booked: false })
            .toArray();
        if (availableItems.length === 0) {
            return null;
        }
        return availableItems as InventoryLaptop[];
    } catch (error: any) {
        console.error(error);
    }
}

type InventoryLaptop = {
    _id: ObjectId;
    description: string;
    status: string;
    metadata: {
        brand: string;
        model: string;
        universityDesignation: string;
        factoryId: string;
        macAddress: {
            device: string;
            address: string;
        };
        comments?: string | null;
        adapter: {
            id: ObjectId;
        };
    };
    barcode: number;
};

export async function InventoryLaptopsTable() {
    const laptops = await availableLaptops();
    if (!laptops) {
        return null;
    }
    const uniqueLaptops = getUniqueItemsFromArray(laptops);

    return (
        <div className="flex items-center mt-4">
            <table className="table-auto my-4 text-left w-full">
                <thead>
                    <tr className="items-center border-b border-grey">
                        <th className="px-2 justify-start">Descripción</th>
                        <th className="px-2 justify-start text-center">
                            Cantidad disponible
                        </th>
                        <th className="px-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {uniqueLaptops.map((laptop, indx) => {
                        const borderBottom =
                            indx < uniqueLaptops.length - 1 ? "border-b" : "";
                        return (
                            <tr
                                key={indx}
                                className={`group py-2 items-center border-grey cursor-pointer ${borderBottom}`}
                            >
                                <td className="px-2 justify-start">
                                    {laptop.description}
                                </td>
                                <td className="px-2 justify-start text-center">
                                    {
                                        laptops.filter(
                                            (value) =>
                                                value.description ===
                                                laptop.description
                                        ).length
                                    }
                                </td>
                                <td className="px-2">
                                    <div className="p-2 my-2 rounded w-24 flex bg-black items-center justify-center invisible group-hover:visible">
                                        <p>Reservar</p>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
