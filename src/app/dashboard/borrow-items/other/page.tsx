import { CustomText } from "@/components/CustomText";

export default function OtherPage() {
    return (
        <>
            <CustomText.h1>Préstamo de otros materiales</CustomText.h1>
            <p>
                Haz click en el siguiente enlace para acceder al formulario de
                préstamo.&nbsp;
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd7MoIAef87cMVmTeyYN31tllCrUtTTqMXQQ9k0R3Vz62OgAg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-pink-400"
                >
                    Formulario de préstamo
                </a>
            </p>
        </>
    );
}
