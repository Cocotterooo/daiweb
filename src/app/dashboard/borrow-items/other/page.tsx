import { CustomText } from "@/components/CustomText";

export default function OtherPage() {
    return (
        <>
            <CustomText.h1>Préstamo de otros materiales</CustomText.h1>
            <p>
                Llena el siguiente&nbsp;
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd7MoIAef87cMVmTeyYN31tllCrUtTTqMXQQ9k0R3Vz62OgAg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 underline"
                >
                    formulario
                </a>
                &nbsp;si quieres algún material distinto a un portátil y a una
                calculadora.
            </p>
        </>
    );
}
