import type { Jornada } from "../../types/jornada";

interface MyJornadasProps {
    jornadas: Jornada[];
}

function MyJornadasPanel({
    jornadas
}: MyJornadasProps) {

    return (
        <section>

            <h2
                className="
                    mb-3
                    text-xl
                    font-semibold
                    text-stone-800
                "
            >
                Mis jornadas
            </h2>

            {jornadas.length === 0 ? (

                <p
                    className="
                        text-sm
                        text-stone-500
                    "
                >
                    No estás inscripto en ninguna jornada.
                </p>

            ) : (

                <div
                    className="
                        flex
                        flex-col
                        gap-3
                    "
                >

                    {jornadas.map((jornada) => {

                        const fecha =
                            new Date(jornada.fechaHora);

                        const fechaFormateada =
                            fecha.toLocaleDateString(
                                "es-AR",
                                {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                }
                            );

                        const hora =
                            fecha.toLocaleTimeString(
                                "es-AR",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }
                            );

                        return (

                            <article
                                key={jornada._id}
                                className="
                                    flex
                                    items-center
                                    gap-4
                                    rounded-xl
                                    border
                                    border-stone-300
                                    bg-amber-50
                                    p-4
                                    shadow-sm
                                "
                            >

                                <div className="min-w-0">

                                    <h3
                                        className="
                                            truncate
                                            font-semibold
                                            text-stone-800
                                        "
                                    >
                                        {jornada.nombre}
                                    </h3>

                                    <p
                                        className="
                                            text-sm
                                            text-stone-600
                                        "
                                    >
                                        {fechaFormateada}
                                        {" · "}
                                        {hora}
                                    </p>

                                    <p
                                        className="
                                            text-xs
                                            text-stone-500
                                        "
                                    >
                                        {jornada.Juegoteka.nombre}
                                    </p>

                                </div>

                            </article>

                        );
                    })}

                </div>
            )}

        </section>
    );
}

export default MyJornadasPanel;