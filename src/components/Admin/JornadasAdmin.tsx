import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { obtenerJornadas, cancelarJornada } from "../../services/jornadaService";

import type { Jornada } from "../../types/jornada";

import Spinner from "../ui/Spinner";

type FiltroFecha = "proximas" | "todas";

function JornadasAdmin() {
    const { token } = useAuth();

    const [jornadas, setJornadas] = useState<Jornada[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [busqueda, setBusqueda] = useState("");
    const [filtroFecha, setFiltroFecha] = useState<FiltroFecha>("proximas");

    useEffect(() => {
        async function cargarJornadas() {
            try {
                const data = await obtenerJornadas();
                setJornadas(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudieron cargar las jornadas"
                );
            } finally {
                setCargando(false);

            }
        }

        cargarJornadas();

    }, []);

    async function handleCancelar(jornada: Jornada) {
        const confirmar = window.confirm(
            `¿Querés cancelar la jornada "${jornada.nombre}"?\n\nEsta acción también eliminará sus encuentros asociados.`
        );

        if (!confirmar || !token) return;

        try {
            await cancelarJornada(jornada._id, token);

            setJornadas(jornadasActuales =>
                jornadasActuales.map(j =>
                    j._id === jornada._id
                        ? { ...j, estado: "cancelado", encuentros: [] }
                        : j
                )
            );
        } catch (error) {
            window.alert(
                error instanceof Error
                    ? error.message
                    : "No se pudo cancelar la jornada"
            );
        }
    }

    const ahora = Date.now();
    const termino = busqueda.trim().toLocaleLowerCase();

    const jornadasFiltradas = jornadas
        .filter(jornada => {
            const fecha = new Date(jornada.fechaHora).getTime();

            const coincideFecha =
                filtroFecha === "todas" || fecha >= ahora;

            const coincideBusqueda =
                jornada.nombre.toLocaleLowerCase().includes(termino) ||
                (jornada.Juegoteka?.nombre || "").toLocaleLowerCase().includes(termino);

            return coincideFecha && coincideBusqueda;
        })
        .sort((a, b) => {
            const fechaA = new Date(a.fechaHora).getTime();
            const fechaB = new Date(b.fechaHora).getTime();

            // Próximas: de la más cercana a la más lejana.
            // Todas: de la más reciente a la más antigua.
            return filtroFecha === "proximas"
                ? fechaA - fechaB
                : fechaB - fechaA;
        });

    if (cargando) return <Spinner />;

    if (error) {
        return <p className="text-red-700">{error}</p>;
    }

    if (jornadas.length === 0) {
        return <p className="text-amber-900">No hay jornadas registradas.</p>;
    }

    return (
        <div className="flex flex-col gap-4">

            {/* Búsqueda y filtro */}
            <div className="grid grid-cols-1 gap-3 rounded-lg bg-amber-100/70 p-4 md:grid-cols-2">

                <div>
                    <label
                        htmlFor="buscar-jornada"
                        className="mb-1 block text-sm font-semibold text-amber-950"
                    >
                        Buscar jornada u organizador
                    </label>

                    <input
                        id="buscar-jornada"
                        type="search"
                        value={busqueda}
                        onChange={event => setBusqueda(event.target.value)}
                        placeholder="Escribí un nombre..."
                        className="w-full rounded-lg border border-amber-900/30 bg-white px-3 py-2 text-sm outline-none focus:border-amber-700"
                    />
                </div>

                <div>
                    <label
                        htmlFor="filtro-fecha"
                        className="mb-1 block text-sm font-semibold text-amber-950"
                    >
                        Mostrar
                    </label>

                    <select
                        id="filtro-fecha"
                        value={filtroFecha}
                        onChange={event =>
                            setFiltroFecha(event.target.value as FiltroFecha)
                        }
                        className="w-full rounded-lg border border-amber-900/30 bg-white px-3 py-2 text-sm"
                    >
                        <option value="proximas">Próximas jornadas</option>
                        <option value="todas">Todas</option>
                    </select>
                </div>

                <div className="text-sm text-amber-900 md:col-span-2">
                    Mostrando <strong>{jornadasFiltradas.length}</strong> de{" "}
                    <strong>{jornadas.length}</strong> jornadas
                </div>
            </div>

            {/* Resultados */}
            {jornadasFiltradas.length === 0 ? (
                <p className="rounded-lg bg-amber-100/70 p-4 text-amber-900">
                    No se encontraron jornadas con esos criterios.
                </p>
            ) : (
                jornadasFiltradas.map(jornada => (
                    <article
                        key={jornada._id}
                        className="rounded-lg border border-amber-900/20 bg-white/70 p-4"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-bold text-amber-950">
                                    {jornada.nombre}
                                </h3>

                                <p className="text-sm text-amber-900">
                                    Organiza: {jornada.Juegoteka?.nombre || "No disponible"}
                                </p>
                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-sm font-semibold ${jornada.estado === "activo"
                                        ? "bg-green-100 text-green-800"
                                        : jornada.estado === "cancelado"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {jornada.estado}
                            </span>
                        </div>

                        <div className="mt-3 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                            <p>
                                <strong>Fecha:</strong>{" "}
                                {new Date(jornada.fechaHora).toLocaleString("es-AR")}
                            </p>

                            <p>
                                <strong>Dirección:</strong>{" "}
                                {jornada.Juegoteka?.direccion || "No disponible"}
                            </p>

                            <p>
                                <strong>Inscripciones:</strong>{" "}
                                {jornada.jugadoresInscriptos?.length ?? 0} / {jornada.capacidad}
                            </p>

                            <p>
                                <strong>Encuentros:</strong>{" "}
                                {jornada.encuentros?.length ?? 0}
                            </p>
                        </div>

                        {jornada.estado === "activo" && (
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => handleCancelar(jornada)}
                                    className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
                                >
                                    Cancelar jornada
                                </button>
                            </div>
                        )}
                    </article>
                ))
            )}
        </div>
    );
}

export default JornadasAdmin;