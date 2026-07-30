import Button from "../ui/Button";

interface AuthHeaderProps {
    onClose: () => void;
}

export default function AuthHeader({ onClose }: AuthHeaderProps) {
    return (
        <header className="border-b border-amber-900/20 px-6 py-6">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.35em] text-amber-700">
                        Juegoteka
                    </p>

                    <h2 className="mt-2 font-title text-3xl text-stone-800">
                        Iniciar sesión
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                        Accedé para participar de jornadas,
                        administrar tu colección y conectar
                        con otros jugadores.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="
        ml-4
        text-2xl
        text-stone-500
        transition-colors
        hover:text-stone-800
    "
                >
                    ✕
                </button>

            </div>

        </header>
    );
}