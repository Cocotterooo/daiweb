/**
 * Filters an array to get unique items based on a specific property.
 *
 * Uses `filter` under the hood, so use with care.
 *
 * @param {any[]} array - The input array containing items with a description property.
 * @returns {any[]} - An array containing only the unique items based on the description property.
 */
export function getUniqueItemsFromArray(array: any[]): any[] {
    return array.filter((value, index) => {
        return (
            index ===
            array.findIndex((obj) => value.description === obj.description)
        );
    });
}
