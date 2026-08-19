import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";

import {
    cancelarInscripcionJornada
} from "../../services/jornadaService";

import type { Jornada } from "../../types/jornada";


interface MyJornadasProps {

    jornadas: Jornada[];

}


function MyJornadasPanel({
    jornadas
}: MyJornadasProps) {

    const { token } = useAuth();


    // Estado local de las jornadas mostradas.
    // Nos permite quitar una jornada de la lista
    // inmediatamente después de cancelar la inscripción.
    const [misJornadas, setMisJornadas] =
        useState<Jornada[]>(jornadas);


    // Si el componente padre recibe nuevas jornadas,
    // actualizamos nuestra copia local.
    useEffect(() => {

        setMisJornadas(jornadas);

    }, [jornadas]);


    async function handleCancelar(
        idJornada: string
    ) {

        if (!token) {
            return;
        }


        try {

            await cancelarInscripcionJornada(
                token,
                idJornada
            );


            // El backend confirmó la baja.
            // Quitamos la jornada de la lista local.
            setMisJornadas(
                (jornadasActuales) =>
                    jornadasActuales.filter(
                        (jornada) =>
                            jornada._id !== idJornada
                    )
            );


        } catch (error) {

            console.error(
                "Error al cancelar inscripción:",
                error
            );

            alert(
                "No se pudo cancelar la inscripción"
            );

        }

    }


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


            {misJornadas.length === 0 ? (

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

                    {misJornadas.map(
                        (jornada) => {

                            const fecha =
                                new Date(
                                    jornada.fechaHora
                                );


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
                                        justify-between
                                        gap-4
                                        rounded-xl
                                        border
                                        border-stone-300
                                        bg-amber-50
                                        p-4
                                        shadow-sm
                                    "
                                >

                                    {/* Información de la jornada */}

                                    <div
                                        className="
                                            min-w-0
                                        "
                                    >

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


                                    {/* Cancelar inscripción */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleCancelar(
                                                jornada._id
                                            )
                                        }
                                        className="
                                            shrink-0
                                            rounded-lg
                                            border
                                            border-red-300
                                            px-3
                                            py-2
                                            text-sm
                                            text-red-700
                                            hover:bg-red-50
                                        "
                                    >
                                        Cancelar
                                    </button>

                                </article>

                            );

                        }
                    )}

                </div>

            )}

        </section>

    );

}


export default MyJornadasPanel;
