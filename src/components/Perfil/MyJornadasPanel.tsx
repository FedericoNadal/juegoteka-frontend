import { useState } from "react";
import type { Jornada } from "../../types/jornada";
import type { Usuario } from "../../types/usuario";

interface MyJornadasProps {
    jornadas: Jornada[];
    usuario: Usuario;
    onSeleccionarJornada: (jornada: Jornada) => void;
    onNuevaJornada: () => void;
}

function MyJornadasPanel({
    jornadas,
    usuario,
    onSeleccionarJornada,
    onNuevaJornada
}: MyJornadasProps) {
    const [abierto, setAbierto] = useState(false);

    const esJuegoteka = usuario.rol === "juegoteka";

    const jornadasActivas = jornadas.filter(
        (jornada) => jornada.estado == "activo"
    );

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

        return (
            <button
                key={jornada._id}
                type="button"
                onClick={() => onSeleccionarJornada(jornada)}
                className="
                    w-full text-left
                    flex items-center gap-4
                    rounded-xl border border-stone-300
                    bg-white p-4 shadow-sm
                    transition hover:bg-stone-50
                "
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

                </div>
            )}
        </section>
    );
}

export default MyJornadasPanel;