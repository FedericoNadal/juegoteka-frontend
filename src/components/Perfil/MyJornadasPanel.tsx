import { useEffect, useState } from "react";
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



    const misJornadas = jornadasActivas.filter(
        (jornada) =>
            String(jornada.Juegoteka.id) === String(usuario.id)
    );

    const otrasJornadas = jornadasActivas.filter(
        (jornada) =>
            String(jornada.Juegoteka.id) !== String(usuario.id)
    );

    const formatearFecha = (fechaHora: string) => {
        const fecha = new Date(fechaHora);

        return {
            fecha: fecha.toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }),
            hora: fecha.toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit"
            })
        };
    };

    const renderJornada = (jornada: Jornada) => {
        const { fecha, hora } = formatearFecha(
            jornada.fechaHora
        );

    const estaInscripto = idsInscripto.includes(jornada._id);


        ///////////////////////////////////////////////////////////////////////////////
        ///
        ///                     RETURN JSX
        ///
        ///////////////////////////////////////////////////////////////////////////////
   
        return (
             <button
                key={jornada._id}
                type="button"
                onClick={() => onSeleccionarJornada(jornada)}
                className={`
                    w-full text-left
                    flex items-center gap-4
                    rounded-xl border border-stone-300
                    p-4 shadow-sm
                    transition hover:bg-stone-50
                    ${estaInscripto ? "bg-amber-50 border-amber-300" : "bg-white"}
                `}
            >
                <div className="min-w-0">
                    <h3 className="truncate font-semibold text-stone-800">
                        {jornada.nombre}
                    </h3>

                    <p className="text-sm text-stone-600">
                        {fecha} · {hora}
                    </p>

                    <p className="text-xs text-stone-500">
                        {jornada.Juegoteka.nombre}
                    </p>
                </div>
            </button>
        );
    };

    return (
        <section className="
            rounded-xl bg-amber-50 shadow overflow-hidden
        ">
            <button
                type="button"
                onClick={() => setAbierto(!abierto)}
                className="
                    flex w-full items-center justify-between
                    p-5 text-left font-title text-xl
                "
            >
                <span>Jornadas</span>
                <span>{abierto ? "⌃" : "⌄"}</span>
            </button>

            {abierto && (
                <div className="px-5 pb-5 flex flex-col gap-6">

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
                                className="
                                    text-sm text-amber-700
                                    hover:underline
                                "
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
                                bg-white p-4
                                font-semibold text-stone-700
                                hover:bg-stone-50
                            "
                        >
                            + Nueva jornada
                        </button>
                    )}

                    {jornadasFiltradas ? (

                        jornadasFiltradas.length === 0 ? (
                            <p className="text-sm text-stone-500">
                                Esta juegoteka no tiene jornadas activas.
                            </p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {jornadasFiltradas.map(renderJornada)}
                            </div>
                        )

                    ) : (
                    <>
                    {esJuegoteka && (
                        <section>
                            <h3 className="
                                mb-3 text-sm font-semibold
                                uppercase tracking-wide
                                text-stone-500
                            ">
                                Mis jornadas
                            </h3>

                            {misJornadas.length === 0 ? (
                                <p className="text-sm text-stone-500">
                                    Todavía no organizaste ninguna jornada.
                                </p>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {misJornadas.map(renderJornada)}
                                </div>
                            )}
                        </section>
                    )}

                    <section>
                        {esJuegoteka && (
                            <h3 className="
                                mb-3 text-sm font-semibold
                                uppercase tracking-wide
                                text-stone-500
                            ">
                                Otras jornadas
                            </h3>
                        )}

                        {otrasJornadas.length === 0 ? (
                            <p className="text-sm text-stone-500">
                                No hay otras jornadas disponibles.
                            </p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {otrasJornadas.map(renderJornada)}
                            </div>
                        )}
                    </section>
                    </>
                   )}
                </div>
            )}
        </section>
    );
}

export default MyJornadasPanel;