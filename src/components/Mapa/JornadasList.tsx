import type { Jornada } from "../../types/jornada";

interface JornadasListProps {
    jornadas: Jornada[];
    onSelectJornada: (jornada: Jornada) => void;
}

function JornadasList({
    jornadas,
    onSelectJornada,
}: JornadasListProps) {

    return (
        <div className="space-y-3">

            {jornadas.map((jornada) => (

                <div
                    key={jornada._id}
                    className="
                        rounded-lg
                        border
                        border-amber-200
                        bg-amber-50
                        p-4
                    "
                >

                    {/* 
                        El nombre es un botón.
                        Al hacer click avisamos al componente padre.
                    */}
                    <button
                        onClick={() => onSelectJornada(jornada)}
                        className="
                            text-left
                            font-bold
                            text-lg
                            text-stone-800
                            hover:text-amber-700
                            hover:underline
                        "
                    >
                        {jornada.nombre}
                    </button>

                    <p className="text-sm text-stone-600 mt-1">

                        {new Date(
                            jornada.fechaHora
                        ).toLocaleString("es-AR", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}

                    </p>

                    <p className="text-sm text-stone-600">
                        🎲 {jornada.Juegoteka.nombre}
                    </p>

                </div>

            ))}

        </div>
    );
}

export default JornadasList;