import type { Jornada } from "../../types/jornada";

import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import {
    inscribirseEnJornada, cancelarInscripcionJornada,
    crearDesafioEnJornada
} from "../../services/jornadaService";
import { invitarJugadorAEncuentro } from "../../services/encuentroService";



interface JornadaOffCanvasProps {

    jornada: Jornada | null;

    onClose: () => void;

    onJornadaActualizada: (
        jornada: Jornada
    ) => void;
}

function JornadaOffCanvas({
    jornada,
    onClose,
    onJornadaActualizada,
}: JornadaOffCanvasProps) {

    const { token, usuario } = useAuth();

    const [inscribiendo, setInscribiendo] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    // Id del jugador al que se le está enviando un desafío en este momento
    // (para deshabilitar solo ese botón, no todos).
    const [desafiando, setDesafiando] =
        useState<string | null>(null);

    // Juego elegido para el próximo desafío. Se inicializa con el
    // primer juego disponible de la jornada, si existe.
   const [juegoSeleccionadoId, setJuegoSeleccionadoId] =
    useState<string>("");

useEffect(() => {
    setJuegoSeleccionadoId(
        jornada?.juegosDisponibles[0]?.id ?? ""
    );
}, [jornada]);

    // Si no hay jornada seleccionada, no mostramos nada
    if (!jornada) {
        return null;
    }

    const estaInscripto =
        usuario &&
        jornada.jugadoresInscriptos.some(
            (jugador) =>
                String(jugador.id) === String(usuario.id)
        );

    const handleInscripcion = async () => {

        if (!token) {

            setError(
                "Necesitás iniciar sesión para realizar esta acción."
            );

            return;
        }

        setInscribiendo(true);
        setError(null);

        try {

            let jornadaActualizada: Jornada;

            if (estaInscripto) {

                jornadaActualizada =
                    await cancelarInscripcionJornada(
                        token,
                        jornada._id
                    );

            } else {

                jornadaActualizada =
                    await inscribirseEnJornada(
                        jornada._id,
                        token
                    );
            }

            onJornadaActualizada(
                jornadaActualizada
            );

        } catch (error) {

            console.error(
                "Error al modificar inscripción:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo modificar la inscripción."
            );

        } finally {

            setInscribiendo(false);

        }
    };


    
    /**
     * Envía un desafío a un jugador inscripto en esta jornada.
     *
     * Es un proceso en dos pasos porque crear el encuentro no
     * genera la notificación por sí solo: recién se dispara al
     * agregar al jugador desafiado como participante nuevo.
     */
    const handleDesafiar = async (idJugadorDesafiado: string) => {

        if (!token) {
            setError(
                "Necesitás iniciar sesión para realizar esta acción."
            );
            return;
        }

       const juego = jornada.juegosDisponibles.find(
    (j) => j.id === juegoSeleccionadoId
);

console.log("juego encontrado:", juego);
        console.log("juegos disponibles:", jornada.juegosDisponibles);
console.log("juego seleccionado:", juegoSeleccionadoId);

        if (!juego) {
            setError(
                "Elegí un juego antes de enviar el desafío."
                
            );
            //console.log(juego);
            return;
        }

        setDesafiando(idJugadorDesafiado);
        setError(null);

        try {

            // Paso 1: crear el encuentro vacío en la jornada
            const jornadaConNuevoEncuentro =
                await crearDesafioEnJornada(
                    jornada._id,
                    {
                        id_juego: juego.id,
                        nombre: juego.titulo,
                        imagen: juego.imagen
                    },
                    2,
                    token
                );

            const idsEncuentros =
                jornadaConNuevoEncuentro.encuentros;

            const idEncuentroCreado =
                idsEncuentros[idsEncuentros.length - 1];

            // Paso 2: invitar al jugador desafiado.
            // Esto es lo que dispara la notificación en su Mazo.
            await invitarJugadorAEncuentro(
                idEncuentroCreado,
                idJugadorDesafiado,
                token
            );

            onJornadaActualizada(
                jornadaConNuevoEncuentro as unknown as Jornada
            );

        } catch (error) {

            console.error(
                "Error al enviar desafío:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo enviar el desafío."
            );

        } finally {

            setDesafiando(null);

        }
    };

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

                    {error && (
                        <p
                            className="
            mt-4
            rounded-lg
            border
            border-red-300
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700
        "
                        >
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleInscripcion}
                        disabled={inscribiendo}
                        className="
        w-full
        mt-8
        rounded-lg
        bg-amber-700
        text-white
        py-3
        font-semibold
        hover:bg-amber-800
        disabled:opacity-50
        disabled:cursor-not-allowed
    "
                    >
                        {inscribiendo
                             ? "Procesando..."
                                : estaInscripto
                                  ? "Desinscribirme"
                                    : "Inscribirme"
                    }
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

                    {estaInscripto &&
                        jornada.juegosDisponibles.length > 0 && (
                        <div className="mb-3">
                            <label className="text-sm text-stone-600">
                                Juego para desafiar:{" "}
                                <select
                                    value={juegoSeleccionadoId}
                                    onChange={(e) =>
                                        setJuegoSeleccionadoId(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        border
                                        border-amber-300
                                        rounded
                                        px-2
                                        py-1
                                    "
                                >
                                    {jornada.juegosDisponibles.map(
                                        (juego) => (
                                            <option
                                                key={juego.id}
                                                value={juego.id}
                                            >
                                                {juego.titulo}
                                            </option>
                                        )
                                    )}
                                </select>
                            </label>
                        </div>
                    )}

                    {jornada.jugadoresInscriptos.length === 0 ? (
                        <p className="text-stone-500">
                            Todavía no hay jugadores inscriptos.
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {jornada.jugadoresInscriptos.map(
                                (jugador) => {

                                    const esUnoMismo =
                                        usuario &&
                                        String(jugador.id) ===
                                            String(usuario.id);

                                    return (
                                        <li
                                            key={jugador.id}
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                            "
                                        >
                                            <span>
                                                👤 {jugador.userName}
                                            </span>

                                            {estaInscripto &&
                                                !esUnoMismo && (
                                                <button
                                                    onClick={() =>
                                                        handleDesafiar(
                                                            jugador.id
                                                        )
                                                    }
                                                    disabled={
                                                        desafiando ===
                                                        jugador.id
                                                    }
                                                    className="
                                                        text-sm
                                                        rounded
                                                        bg-amber-700
                                                        text-white
                                                        px-3
                                                        py-1
                                                        hover:bg-amber-800
                                                        disabled:opacity-50
                                                    "
                                                >
                                                    {desafiando ===
                                                    jugador.id
                                                        ? "Enviando..."
                                                        : "Desafiar"}
                                                </button>
                                            )}
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    )}

                </section>

            </aside>
        </>
    );
}

export default JornadaOffCanvas;