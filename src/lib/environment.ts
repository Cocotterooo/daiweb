import { EnvironmentSecrets, EnvironmentVariables } from "@/types";

const {
    CLERK_WEBHOOK_SECRET,
    CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
} = process.env as any as EnvironmentVariables;

const envSecrets: EnvironmentSecrets = {
    pub: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: NEXT_PUBLIC_CLERK_SIGN_UP_URL,
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
            NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
            NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    },
    server: {
        CLERK_WEBHOOK_SECRET: CLERK_WEBHOOK_SECRET,
        CLERK_SECRET_KEY: CLERK_SECRET_KEY,
        SUPABASE_URL: SUPABASE_URL,
        SUPABASE_ANON_KEY: SUPABASE_ANON_KEY,
    },
};

export default envSecrets;