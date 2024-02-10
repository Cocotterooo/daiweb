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
        <div className="mt-4 flex items-center">
            <table className="my-4 w-full table-auto text-left">
                <thead>
                    <tr className="border-grey items-center border-b">
                        <th className="justify-start px-2">Descripción</th>
                        <th className="justify-start px-2 text-center">
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
                                className={`border-grey group cursor-pointer items-center py-2 ${borderBottom}`}
                            >
                                <td className="justify-start px-2">
                                    {item.description}
                                </td>
                                <td className="justify-start px-2 text-center">
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
