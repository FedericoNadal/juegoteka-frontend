import type { Jornada } from "../../types/jornada";

interface JornadaOffCanvasProps {
    jornada: Jornada | null;
    onClose: () => void;
}

function JornadaOffCanvas({
    jornada,
    onClose,
}: JornadaOffCanvasProps) {

    // Si no hay jornada seleccionada, no mostramos nada
    if (!jornada) {
        return null;
    }

    return (
        <>
            {/* Fondo oscuro */}
            <div
                className="
                    fixed
                    inset-0
                    bg-black/40
                    z-40
                "
                onClick={onClose}
            />

            {/* Panel */}
            <aside
                className="
                    fixed
                    top-0
                    right-0
                    z-50
                    h-full
                    w-full
                    sm:w-[450px]
                    bg-amber-50
                    shadow-2xl
                    overflow-y-auto
                    p-6
                "
            >

                {/* Encabezado */}
                <div className="flex justify-between items-start mb-6">

                    <div>
                        <p className="text-sm text-stone-500">
                            Jornada
                        </p>

                        <h2 className="
                            text-2xl
                            font-bold
                            text-stone-800
                        ">
                            {jornada.nombre}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="
                            text-2xl
                            text-stone-600
                            hover:text-stone-900
                        "
                        aria-label="Cerrar"
                    >
                        ×
                    </button>

                </div>

                {/* Información básica */}
                <section className="space-y-3">

                    <div>
                        <strong>📅 Fecha:</strong>{" "}
                        {new Date(jornada.fechaHora).toLocaleString(
                            "es-AR",
                            {
                                dateStyle: "medium",
                                timeStyle: "short",
                            }
                        )}
                    </div>

                    <div>
                        <strong>💰 Inscripción:</strong>{" "}
                        ${jornada.precioInscripcion}
                    </div>

                    <div>
                        <strong>👥 Capacidad:</strong>{" "}
                        {jornada.jugadoresInscriptos.length}
                        {" / "}
                        {jornada.capacidad}
                    </div>

                    <div>
                        <strong>🎲 Juegoteka:</strong>{" "}
                        {jornada.Juegoteka.nombre}
                    </div>

                </section>

                {/* Juegos */}
                <section className="mt-6">

                    <h3 className="font-bold text-lg mb-2">
                        Juegos disponibles
                    </h3>

                    <ul className="space-y-1">
                        {jornada.juegosDisponibles.map((juego) => (
                            <li
                                key={juego.id}
                                className="text-stone-700"
                            >
                                🎲 {juego.titulo}
                            </li>
                        ))}
                    </ul>

                </section>

                {/* Encuentros */}
                <section className="mt-6">

                    <h3 className="font-bold text-lg mb-2">
                        Encuentros
                    </h3>

                    {jornada.encuentros.length === 0 ? (
                        <p className="text-stone-500">
                            Todavía no hay encuentros.
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {jornada.encuentros.map((encuentro) => (
                                <li
                                    key={encuentro._id}
                                    className="
                                        border
                                        border-amber-200
                                        rounded-lg
                                        p-3
                                        bg-white
                                    "
                                >
                                    {encuentro.tipo}
                                </li>
                            ))}
                        </ul>
                    )}

                </section>

                {/* Jugadores */}
                <section className="mt-6">

                    <h3 className="font-bold text-lg mb-2">
                        Inscriptos
                    </h3>

                    {jornada.jugadoresInscriptos.length === 0 ? (
                        <p className="text-stone-500">
                            Todavía no hay jugadores inscriptos.
                        </p>
                    ) : (
                        <ul className="space-y-1">
                            {jornada.jugadoresInscriptos.map(
                                (jugador) => (
                                    <li key={jugador.id}>
                                        👤 {jugador.userName}
                                    </li>
                                )
                            )}
                        </ul>
                    )}

                </section>

                {/* Acción */}
                <button
                    className="
                        w-full
                        mt-8
                        rounded-lg
                        bg-amber-700
                        text-white
                        py-3
                        font-semibold
                        hover:bg-amber-800
                    "
                >
                    Inscribirme
                </button>

            </aside>
        </>
    );
}

export default JornadaOffCanvas;