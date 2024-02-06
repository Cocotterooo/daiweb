import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const databaseUrl = process.env.DATABASE_URL;
const databaseKey = process.env.DATABASE_KEY;

if (!databaseUrl) {
    throw new Error("Missing DATABASE_URL environment variable");
}

if (!databaseKey) {
    throw new Error("Missing DATABASE_KEY environment variable");
}

const database = createClient<Database>(databaseUrl, databaseKey);

export default database;
