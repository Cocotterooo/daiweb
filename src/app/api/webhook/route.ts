import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserWebhookEvent, WebhookEvent } from "@clerk/nextjs/server";
import database from "@/database/client";

// TODO: Log all events and errors
export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Couldn't find WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
        );
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let event: WebhookEvent;

    // Verify the payload with the headers
    try {
        event = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as UserWebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    switch (event.type) {
        case "user.created":
            if (event.data.email_addresses.length !== 1) {
                console.error("User has more than 1 email address");
                return new Response("", { status: 500 });
            }
            if (
                event.data.email_addresses[0].verification?.status !==
                "verified"
            ) {
                return new Response(
                    "Unverified email addresses are rejected by default",
                    { status: 422 }
                );
            }
            let emailIsVerified = false;
            if (
                event.data.email_addresses[0].verification.status === "verified"
            ) {
                emailIsVerified = true;
            }
            const {
                error: insertError,
                status,
                statusText,
            } = await database.from("user").insert({
                external_user_id: event.data.id,
                email: event.data.email_addresses[0].email_address,
                is_staff: false,
                is_verified: false,
                last_updated_at: new Date(event.data.created_at).toISOString(),
            });
            if (insertError) {
                console.error(insertError);
                if (
                    insertError.message ===
                    'duplicate key value violates unique constraint "users_external_user_id_key"'
                ) {
                    return new Response("User already exists", { status: 409 });
                }
                console.error(insertError);
                return new Response("User could not be created", {
                    status: 500,
                });
            }
            if (status === 201 && statusText === "Created") {
                return new Response("", { status: 201 });
            }
            break;
        // TODO: Enable this
        case "user.updated":
            break;
        case "user.deleted":
            break;

        default:
            console.error("Unrecognized event was sent", [event]);
            return new Response("Unrecognized event", { status: 500 });
    }
}
