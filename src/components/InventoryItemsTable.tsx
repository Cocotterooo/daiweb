import { Database } from "@/database/database.types";
import { getUniqueItemsFromArray } from "@/utils/arrayFuncs";
import { BookItem } from "./BookItem";
import { bookItem } from "@/actions/bookItem";

type AvailableItemsTableProps = {
    userId: number;
    items: Database["public"]["Tables"]["inventory_item"]["Row"][];
};

export function AvailableItemsTable({
    userId,
    items,
}: AvailableItemsTableProps) {
    const uniqueItems = getUniqueItemsFromArray(items);

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
                    {uniqueItems.map((item, indx) => {
                        const borderBottom =
                            indx < uniqueItems.length - 1 ? "border-b" : "";
                        return (
                            <tr
                                key={indx}
                                className={`group py-2 items-center border-grey cursor-pointer ${borderBottom}`}
                            >
                                <td className="px-2 justify-start">
                                    {item.description}
                                </td>
                                <td className="px-2 justify-start text-center">
                                    {
                                        items.filter(
                                            (value) =>
                                                value.description ===
                                                item.description
                                        ).length
                                    }
                                </td>
                                <td className="px-2">
                                    <BookItem
                                        itemId={items[0].id}
                                        action={bookItem}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
