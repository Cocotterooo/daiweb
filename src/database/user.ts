import database from "./client";

export async function getUserIdFromExternalId(externalId: string) {
    const { data, error } = await database
        .from("user")
        .select("id")
        .eq("external_user_id", externalId);
    if (error) {
        console.error(error);
        return null;
    }
    if (!data || data.length === 0) {
        return null;
    }
    if (data.length > 1) {
        console.error("Massive database corruption");
        return null;
    }
    return data[0].id;
}

export async function isUserVerified(externalId: string) {
    const { data, error } = await database
        .from("user")
        .select("is_verified")
        .eq("external_user_id", externalId);
    if (error) {
        console.error(error);
        return null;
    }
    if (!data || data.length === 0) {
        return null;
    }
    if (data.length > 1) {
        console.error("Massive database corruption");
        return null;
    }
    return data[0].is_verified;
}
