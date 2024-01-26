export function getClerErrorMessage(clerkError: any) {
    if (!(clerkError.code && clerkError.longMessage && clerkError.message)) {
        return null;
    }
    if (
        clerkError.code === "form_param_format_invalid" &&
        clerkError.message === "Identifier is invalid." &&
        clerkError.longMessage === "Identifier is invalid."
    ) {
        return "Solo son válidos correos asociados a la uvigo.";
    }
    if (
        clerkError.code === "form_identifier_not_found" &&
        clerkError.message === "Couldn't find your account." &&
        clerkError.longMessage === "Couldn't find your account."
    ) {
        return "Tu correo no está asociado a ninguna cuenta.";
    }
    if (
        clerkError.code === "form_param_nil" &&
        clerkError.message === "Enter code." &&
        clerkError.longMessage === "Enter code."
    ) {
        return "Por favor, ingresa el código que recibiste en el correo ingresado.";
    }
    if (
        clerkError.code === "form_code_incorrect" &&
        clerkError.message === "is incorrect" &&
        clerkError.longMessage === "Incorrect code"
    ) {
        return "El código no es correcto";
    }
    if (
        clerkError.code === "verification_expired" &&
        clerkError.message === "expired" &&
        clerkError.longMessage ===
            "This verification has expired. You must create a new one."
    ) {
        return "El proceso de verificación expiró. Por favor, empieza de nuevo.";
    }
    if (
        clerkError.code === "form_password_pwned" &&
        clerkError.message ===
            "Password has been found in an online data breach.  For account safety, please use a different password." &&
        clerkError.longMessage ===
            "Password has been found in an online data breach.  For account safety, please use a different password."
    ) {
        return "Contraseña comprometida. Por tu seguridad, elige otra.";
    }
    if (
        clerkError.code === "too_many_requests" &&
        clerkError.message ===
            "Too many requests. Please try again in a bit." &&
        !clerkError.longMessage
    ) {
        return "Demasiados intentos. Por favor, espera un poquito e intenta de nuevo.";
    }
    if (
        clerkError.code === "form_identifier_exists" &&
        clerkError.message ===
            "That email address is taken. Please try another." &&
        clerkError.longMessage ===
            "That email address is taken. Please try another."
    ) {
        return "Correo electrónico en uso. Por favor, intenta con otro.";
    }
    return null;
}
