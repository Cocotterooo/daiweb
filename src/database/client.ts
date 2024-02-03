import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const databaseClient = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);
export default databaseClient;
