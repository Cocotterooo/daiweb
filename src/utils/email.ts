export function isStudentEmail(email: string) {
    return (
        email.includes("alumnos.uvigo.gal") ||
        email.includes("alumnos.uvigo.es")
    );
}
