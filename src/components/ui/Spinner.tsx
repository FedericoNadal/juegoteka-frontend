import { useEffect, useState } from "react";

interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    label?: string;
    className?: string;
}

function Spinner({ size = "md", label, className = "" }: SpinnerProps) {

    const tamaños = {
        sm: "text-base",
        md: "text-2xl",
        lg: "text-4xl",
    };

    const [invertido, setInvertido] = useState(false);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setInvertido((anterior) => !anterior);
        }, 600);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <span
            role="status"
            className={`inline-flex items-center justify-center gap-3 text-amber-800 ${className}`}
        >
            <span
                aria-hidden="true"
                className={tamaños[size]}
            >
                {invertido ? "⌛" : "⏳"}
            </span>

            {label && <span className="text-sm">{label}</span>}
        </span>
    );
}

export default Spinner;