import { useEffect, useState } from "react";
import JornadasCalendar from "./JornadasCalendar";

import type { Jornada } from "../../types/jornada";
import type { Usuario } from "../../types/usuario";

interface MyJornadasProps {
    jornadas: Jornada[];
    usuario: Usuario;
    onSeleccionarJornada: (jornada: Jornada) => void;
    onNuevaJornada: () => void;
    filtroJuegotekaId?: string | null;
    onLimpiarFiltro?: () => void;
    forzarAbierto?: boolean;
    idsInscripto?: string[];
}

function MyJornadasPanel({
    jornadas,
    usuario,
    onSeleccionarJornada,
    onNuevaJornada,
    filtroJuegotekaId = null,
    onLimpiarFiltro,
    forzarAbierto = false,
    idsInscripto = []
}: MyJornadasProps) {
    const [abierto, setAbierto] = useState(false);

    // Si el padre pide forzar apertura (venís del mapa con un filtro
    // activo), se abre. No se cierra solo si el padre deja de forzarlo:
    // el usuario puede haberlo dejado abierto a propósito después.
    useEffect(() => {
        if (forzarAbierto) {
            setAbierto(true);
        }
    }, [forzarAbierto]);


    const esJuegoteka = usuario.rol === "juegoteka";

    const jornadasActivas = jornadas.filter(
        (jornada) => jornada.estado == "activo"
    );

    // Si hay un filtro de juegoteka activo, se muestra una única lista
    // filtrada en vez de separar "Mis jornadas" / "Otras jornadas".
    const jornadasFiltradas = filtroJuegotekaId
        ? jornadasActivas.filter(
            (jornada) =>
                String(jornada.Juegoteka.id) === String(filtroJuegotekaId)
        )
        : null;

    const jornadasVisibles = jornadasFiltradas ?? jornadasActivas;




    ///////////////////////////////////////////////////////////////////////////////
    ///
    ///                     RETURN JSX
    ///
    ///////////////////////////////////////////////////////////////////////////////

    return (
        <section className="rounded-xl bg-amber-50/50 shadow overflow-hidden w-full max-w-md mx-auto">
            <button
                type="button"
                onClick={() => setAbierto(!abierto)}
                className="
        relative flex w-full items-center justify-center
        p-5 font-title text-xl
    "
            >
                <span>  🗓️  Agenda</span>
                <span>{abierto ? "⌃" : ""}</span>
            </button>

            {abierto && (

                <div className="px-5 pb-5 flex flex-col gap-6 ">

                    {jornadasFiltradas && (
                        <div className="
                        flex items-center justify-between
                        rounded-lg bg-amber-100 px-4 py-2
                    ">
                            <span className="text-sm text-amber-900">
                                Mostrando jornadas de esta juegoteka
                            </span>

                            <button
                                type="button"
                                onClick={onLimpiarFiltro}
                                className="text-sm text-amber-700 hover:underline"
                            >
                                Ver todas
                            </button>
                        </div>
                    )}

                    {esJuegoteka && (
                        <button
                            type="button"
                            onClick={onNuevaJornada}
                            className="
                            w-full rounded-xl
                            border-2 border-dashed border-stone-400
                            bg-white p-4 font-semibold text-stone-700
                            hover:bg-stone-50
                        "
                        >
                            + Nueva jornada
                        </button>
                    )}

                    <JornadasCalendar
                        jornadas={jornadasVisibles}
                        usuario={usuario}
                        idsInscripto={idsInscripto}
                        onSeleccionarJornada={onSeleccionarJornada}
                    />
                </div>
            )}
        </section>
    );
}

export default MyJornadasPanel;