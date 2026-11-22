import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { obtenerJuegos, eliminarJuego } from "../../services/juegoService";
import type { Juego } from "../../types/juego";
import Spinner from "../ui/Spinner";

function JuegosAdmin() {
    const { token } = useAuth();

    const [juegos, setJuegos] = useState<Juego[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function cargarJuegos() {
            try {
                const data = await obtenerJuegos();
                setJuegos(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "No se pudieron cargar los juegos");
            } finally {
                setCargando(false);
            }
        }

        cargarJuegos();
    }, []);

    async function handleEliminar(juego: Juego) {
        const confirmar = window.confirm(
            `¿Querés dar de baja el juego "${juego.titulo}"?`
        );

        if (!confirmar || !token) return;

        try {
            const juegoActualizado = await eliminarJuego(juego._id, token);

            setJuegos(juegosActuales =>
                juegosActuales.map(j =>
                    j._id === juego._id ? juegoActualizado : j
                )
            );
        } catch (error) {
            window.alert(
                error instanceof Error ? error.message : "No se pudo dar de baja el juego"
            );
        }
    }

    if (cargando) return <Spinner />;

    if (error) {
        return <p className="text-red-700">{error}</p>;
    }

    if (juegos.length === 0) {
        return <p className="text-amber-900">No hay juegos registrados.</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {juegos.map(juego => (
                <article
                    key={juego._id}
                    className="flex flex-col rounded-lg border border-amber-900/20 bg-white/70 p-4"
                >
                    {juego.imagen && (
                        <img
                            src={juego.imagen}
                            alt={juego.titulo}
                            className="mb-3 h-40 w-full rounded-lg object-cover"
                        />
                    )}

                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-bold text-amber-950">
                            {juego.titulo}
                        </h3>

                        <span
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                                juego.estado === "activo"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {juego.estado}
                        </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-700">
                        {juego.descripcion}
                    </p>

                    <div className="mt-3 text-sm text-gray-700">
                        <p>
                            <strong>Jugadores:</strong>{" "}
                            {juego.cantJugadoresMin} a {juego.cantJugadoresMax}
                        </p>

                        <p>
                            <strong>Duración estimada:</strong>{" "}
                            {juego.tiempoEstimado} minutos
                        </p>
                    </div>

                    {juego.estado === "activo" && (
                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={() => handleEliminar(juego)}
                                className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
                            >
                                Dar de baja
                            </button>
                        </div>
                    )}
                </article>
            ))}
        </div>
    );
}

export default JuegosAdmin;