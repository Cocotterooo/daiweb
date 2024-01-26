import { dateToDMY } from "@/utils/date";

export type BorrowedItemsTransaction = {
    transaction_id: number;
    borrower_id: string;
    item_id: string;
    staff_id: string;
    transaction_type: "Borrow" | "Return";
    transaction_timestamp: Date;
    expected_return_date: Date;
    actual_return_date: Date;
};

const transactions: BorrowedItemsTransaction[] = [
    {
        transaction_id: 1,
        borrower_id: "101",
        item_id: "201123123",
        staff_id: "301",
        transaction_type: "Borrow",
        transaction_timestamp: new Date("2023-01-15T10:30:00Z"),
        expected_return_date: new Date("2023-02-01T10:30:00Z"),
        actual_return_date: new Date("2023-02-01T10:30:00Z"),
    },
    {
        transaction_id: 2,
        borrower_id: "102",
        item_id: "202",
        staff_id: "302",
        transaction_type: "Return",
        transaction_timestamp: new Date("2023-02-20T14:45:00Z"),
        expected_return_date: new Date("2023-02-25T14:45:00Z"),
        actual_return_date: new Date("2023-02-23T14:45:00Z"),
    },
    {
        transaction_id: 3,
        borrower_id: "103",
        item_id: "203",
        staff_id: "303",
        transaction_type: "Borrow",
        transaction_timestamp: new Date("2023-03-10T09:15:00Z"),
        expected_return_date: new Date("2023-03-20T09:15:00Z"),
        actual_return_date: new Date("2023-02-01T10:30:00Z"),
    },
];

export default function BorrowedItemsPage() {
    return (
        <div className="flex items-center justify-center">
            <table className="table-auto my-4 text-left">
                <thead>
                    <tr className="items-center border-b border-grey">
                        <th className="px-2 justify-start">Nombre</th>
                        <th className="px-2 justify-start text-center">
                            Fecha de préstamo
                        </th>
                        <th className="px-2 justify-start text-center">
                            Fecha de entrega
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((value, indx) => {
                        const borderBottom =
                            indx < transactions.length - 1 ? "border-b" : "";
                        return (
                            <tr
                                key={indx}
                                className={`items-center border-grey ${borderBottom}`}
                            >
                                <td className="px-2 justify-start">
                                    {value.item_id}
                                </td>
                                <td className="px-2 justify-start text-center">
                                    {dateToDMY(value.transaction_timestamp)}
                                </td>
                                <td className="px-2 justify-center text-center">
                                    {dateToDMY(value.expected_return_date)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
