import { useEffect, useState } from "react";

interface SpinnerProps {
    size?: "sm" | "md" | "lg" | "full";
    label?: string;
    className?: string;
}

function Spinner({ size = "md", label, className = "" }: SpinnerProps) {

    const tamaños = {
        sm: "text-base",
        md: "text-2xl",
        lg: "text-4xl",
        full: "text-[clamp(5rem,20vw,12rem)]",
    };

    const [invertido, setInvertido] = useState(false);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setInvertido((anterior) => !anterior);
        }, 600);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <div
            role="status"
            className={`flex w-full items-center justify-center  gap-3 text-amber-800 ${className}`}>
            <span
                aria-hidden="true"
                className={tamaños[size]}
            >
                {invertido ? "⌛" : "⏳"}
            </span>

            {label && <span className="text-sm text-center">{label}</span>}
        </div>
    );
}

export default Spinner;