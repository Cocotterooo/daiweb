export function parseStudentSignUpPdfFileContent(
    keywords: string[],
    academicPeriod: string,
    studentName: string,
    studentId: string
) {
    if (keywords[5].slice(0, keywords[5].length - 2) !== academicPeriod) {
        return false;
    }

    // Get the name of the student
    const name = keywords.slice(
        keywords.indexOf("estudiante:") + 1,
        keywords.indexOf("NIA:")
    );
    // Find that fucking last name comma
    let i;
    for (i = 0; i < name.length; i++) {
        if (name[i].includes(",")) {
            break;
        }
    }

    // Remove the comma from the second last name
    name[i] = name[i].slice(0, name[i].length - 1);

    const firstName = name.slice(i + 1, name.length);
    const lastName = name.slice(0, 2);
    const fileStudentName = `${firstName.join(" ")} ${lastName.join(" ")}`;

    // Get the ID of the student
    const fileStudentId = keywords[keywords.indexOf("DNI:") + 1];

    if (!(studentName === fileStudentName && studentId === fileStudentId)) {
        return false;
    }

    return true;
}
