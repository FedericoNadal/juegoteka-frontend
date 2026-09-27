import type { Jornada } from "../../types/jornada";

import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import {
    inscribirseEnJornada,
    cancelarInscripcionJornada,
    crearDesafioEnJornada,
    cancelarJornada,
  
} from "../../services/jornadaService";

import { 
    invitarJugadorAEncuentro,  inscribirseEnEncuentro, cancelarInscripcionEncuentro
 } from "../../services/encuentroService";
import { obtenerJornadaPorId } from "../../services/jornadaService";


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

    const [cancelando, setCancelando] =
    useState(false);
    const [error, setError] =
        useState<string | null>(null);

    // Id del jugador al que se le está enviando un desafío en este momento
    // (para deshabilitar solo ese botón, no todos).
    const [desafiando, setDesafiando] =
        useState<string | null>(null);

    const [creandoTorneo, setCreandoTorneo] =
    useState(false);

const [mostrarFormularioTorneo, setMostrarFormularioTorneo] =
    useState(false);

const [juegoTorneoId, setJuegoTorneoId] =
    useState("");

const [capacidadTorneo, setCapacidadTorneo] =
    useState("4");

    // Juego elegido para el próximo desafío. Se inicializa con el
    // primer juego disponible de la jornada, si existe.
   const [juegoSeleccionadoId, setJuegoSeleccionadoId] =
    useState<string>("");

useEffect(() => {
    const primerJuego =
        jornada?.juegosDisponibles[0]?.id ?? "";

    setJuegoSeleccionadoId(primerJuego);
    setJuegoTorneoId(primerJuego);
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

const esJugador = usuario?.rol === "jugador";
const esJuegoteka = usuario?.rol === "juegoteka";

const esJuegotekaPropietaria =
    esJuegoteka &&
    String(jornada.Juegoteka.id) === String(usuario.id);

    // Un desafío es privado entre createdBy y los jugadores invitados;
// un torneo es público para toda la jornada. Filtramos antes de listar
// para que un jugador no vea desafíos ajenos.
const encuentrosVisibles = jornada.encuentros.filter((encuentro) => {
    if (encuentro.tipo !== "desafío") {
        return true; // torneo: visible para todos
    }

    if (!usuario) return false;

    const esCreador = encuentro.createdBy.some(
        (org) => String(org.id_usuario) === String(usuario.id)
    );

    const esParticipante = encuentro.jugadores.some(
        (jugador) => String(jugador.id_jugador) === String(usuario.id)
    );

    return esCreador || esParticipante;
});

// Encuentros activos por juego, para visibilizar contención de tableros
// físicos sin exponer participantes. Se calcula sobre jornada.encuentros
// COMPLETO (no encuentrosVisibles): el uso del tablero es real para todos,
// aunque el jugador no pueda ver el detalle de cada desafío ajeno.
const encuentrosActivosPorJuego = jornada.encuentros
    .filter((e) => e.estado !== "cancelado" && e.estado !== "finalizado")
    .reduce<Record<string, number>>((acc, encuentro) => {
        const idJuego = encuentro.juego?.[0]?.id_juego;
        if (!idJuego) return acc;
        acc[idJuego] = (acc[idJuego] ?? 0) + 1;
        return acc;
    }, {});



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

   // console.log("juego encontrado:", juego);
    //console.log("juegos disponibles:", jornada.juegosDisponibles);
    //console.log("juego seleccionado:", juegoSeleccionadoId);
   // console.log("Juego seleccionado:", juego);
   // console.log("ID enviado:", juego.id);
    //console.log("_ID juego:", juego._id);

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
const encuentros =
    jornadaConNuevoEncuentro.encuentros;

const encuentroCreado =
    encuentros[encuentros.length - 1];

await invitarJugadorAEncuentro(
    encuentroCreado._id,
    idJugadorDesafiado,
    token
);
          

            onJornadaActualizada(
    jornadaConNuevoEncuentro
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

    const handleCancelarJornada = async () => {
    if (!token) {
        setError(
            "Necesitás iniciar sesión para realizar esta acción."
        );
        return;
    }

    setCancelando(true);
    setError(null);

    try {
        const jornadaActualizada =
            await cancelarJornada(
                jornada._id,
                token
            );

        onJornadaActualizada(jornadaActualizada);
        onClose();

    } catch (error) {
        console.error(
            "Error al cancelar jornada:",
            error
        );

        setError(
            error instanceof Error
                ? error.message
                : "No se pudo cancelar la jornada."
        );

    } finally {
        setCancelando(false);
    }
};

//////////////////
const handleCrearTorneo = async () => {
    if (!token) {
        setError(
            "Necesitás iniciar sesión para realizar esta acción."
        );
        return;
    }

    const juego =
        jornada.juegosDisponibles.find(
            (j) => j.id === juegoTorneoId
        );

    if (!juego) {
        setError(
            "Elegí un juego para el torneo."
        );
        return;
    }

    setCreandoTorneo(true);
    setError(null);

    try {
        const jornadaActualizada =
            await crearDesafioEnJornada(
                jornada._id,
                {
                    id_juego: juego.id,
                    nombre: juego.titulo,
                    imagen: juego.imagen
                },
                Number(capacidadTorneo),
                token
            );

        onJornadaActualizada(
            jornadaActualizada
        );

        setMostrarFormularioTorneo(false);

    } catch (error) {
        console.error(
            "Error al crear torneo:",
            error
        );

        setError(
            error instanceof Error
                ? error.message
                : "No se pudo crear el torneo."
        );

    } finally {
        setCreandoTorneo(false);
    }
};

console.log({
    juegos: jornada.juegosDisponibles.map((juego) => juego.id),
    encuentros: jornada.encuentros.map(
        (encuentro) => encuentro._id
    ),
    jugadores: jornada.jugadoresInscriptos.map(
        (jugador) => jugador.id
    ),
});
///////////////////////
const handleInscribirseEnTorneo = async (idEncuentro: string) => {
    if (!token || !usuario) return;

    try {
        await inscribirseEnEncuentro(
            idEncuentro,
            usuario.id,
            token
        );

        const jornadaActualizada =
            await obtenerJornadaPorId(jornada._id);

        onJornadaActualizada(jornadaActualizada);
    } catch (error) {
        console.error(
            "Error al inscribirse en el torneo:",
            error
        );

        setError(
            error instanceof Error
                ? error.message
                : "No se pudo realizar la inscripción"
        );
    }
};
/////////////////////////
// NUEVO: espejo de handleInscribirseEnTorneo. Solo válida para torneos
// (así lo exige encuentroService.cancelarInscripcionJugador en el backend);
// el idJugador no se envía, el backend lo toma de req.user.id.
const handleDesinscribirseDeTorneo = async (idEncuentro: string) => {
    if (!token || !usuario) return;

    try {
        await cancelarInscripcionEncuentro(
            idEncuentro,
            token
        );

        const jornadaActualizada =
            await obtenerJornadaPorId(jornada._id);

        onJornadaActualizada(jornadaActualizada);
    } catch (error) {
        console.error(
            "Error al desinscribirse del torneo:",
            error
        );

        setError(
            error instanceof Error
                ? error.message
                : "No se pudo cancelar la inscripción"
        );
    }
};
/////////////////////////
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

                   {esJugador && (
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
                : "Inscribirme"}
    </button>
)}

{esJuegotekaPropietaria && (
    <button
        type="button"
        onClick={handleCancelarJornada}
        disabled={cancelando}
        className="
            w-full
            mt-3
            rounded-lg
            border
            border-red-400
            text-red-700
            py-3
            font-semibold
            hover:bg-red-50
            disabled:opacity-50
            disabled:cursor-not-allowed
        "
    >
        {cancelando
            ? "Cancelando..."
            : "Cancelar jornada"}
    </button>
)}
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
    {jornada.juegosDisponibles.map((juego) => {
        const enUso = encuentrosActivosPorJuego[juego.id] ?? 0;

        return (
            <li key={juego.id} className="text-stone-700">
                🎲 {juego.titulo}
                {enUso > 0 && (
                    <span className="text-xs text-stone-500">
                        {" "}— {enUso} {enUso === 1 ? "encuentro agendado" : "encuentros agendados "}
                    </span>
                )}
            </li>
        );
    })}
</ul>

                </section>

                {/* Encuentros */}
                <section className="mt-6">

                    <h3 className="font-bold text-lg mb-2">
                        Encuentros
                    </h3>
{esJuegotekaPropietaria && (
    <>
        {!mostrarFormularioTorneo ? (
            <button
                type="button"
                onClick={() =>
                    setMostrarFormularioTorneo(true)
                }
                className="
                    mt-3
                    w-full
                    rounded-lg
                    bg-amber-700
                    px-4
                    py-2
                    font-semibold
                    text-white
                    hover:bg-amber-800
                "
            >
                Crear torneo
            </button>
        ) : (
            <div className="mt-3 space-y-3 rounded-lg border border-amber-200 bg-white p-4">

                <label className="flex flex-col gap-1">
                    <span className="text-sm">
                        Juego
                    </span>

                    <select
                        value={juegoTorneoId}
                        onChange={(e) =>
                            setJuegoTorneoId(
                                e.target.value
                            )
                        }
                        className="
                            rounded-lg
                            border
                            border-amber-300
                            px-2
                            py-2
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

                <label className="flex flex-col gap-1">
                    <span className="text-sm">
                        Capacidad
                    </span>

                    <input
                        type="number"
                        min="2"
                        value={capacidadTorneo}
                        onChange={(e) =>
                            setCapacidadTorneo(
                                e.target.value
                            )
                        }
                        className="
                            rounded-lg
                            border
                            border-amber-300
                            px-2
                            py-2
                        "
                    />
                </label>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleCrearTorneo}
                        disabled={creandoTorneo}
                        className="
                            flex-1
                            rounded-lg
                            bg-amber-700
                            px-4
                            py-2
                            text-white
                            disabled:opacity-50
                        "
                    >
                        {creandoTorneo
                            ? "Creando..."
                            : "Crear torneo"}
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setMostrarFormularioTorneo(false)
                        }
                        className="
                            rounded-lg
                            border
                            px-4
                            py-2
                        "
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        )}
    </>

)}
                  {encuentrosVisibles.length === 0 ? (
    <p className="text-stone-500">
        Todavía no hay encuentros.
    </p>
) : (
    <ul className="space-y-2">
        {encuentrosVisibles.map((encuentro) => {

    const esTorneo = encuentro.tipo === "torneo";
    const juego = encuentro.juego?.[0];

    const yaInscripto =
        usuario &&
        encuentro.jugadores.some(
            (jugador) =>
                String(jugador.id_jugador) ===
                String(usuario.id)
        );

    const completo =
        encuentro.jugadores.length >= encuentro.capacidad;

    // NUEVO: color del botón torneo según el estado (inscribirme/desinscribirme)
    const colorBotonTorneo = yaInscripto
        ? "bg-red-600 hover:bg-red-700"
        : "bg-amber-700 hover:bg-amber-800";

    return (
        <li
            key={encuentro._id}
            className="
                rounded-lg
                border
                border-amber-200
                bg-white
                p-3
            "
        >
            <div className="flex items-start justify-between gap-3">

                <div>
                    <p className="font-semibold text-stone-800">
                        {esTorneo
                            ? "🏆 Torneo"
                            : "⚔ Desafío"}
                    </p>

                    {juego && (
                        <p className="text-sm text-stone-600">
                            {juego.nombre}
                        </p>
                    )}

                    <p className="mt-1 text-xs text-stone-500">
                        {encuentro.jugadores.length} /{" "}
                        {encuentro.capacidad} jugadores
                    </p>
                </div>

                {esTorneo &&
                    esJugador &&
                    !esJuegotekaPropietaria && (
                        // MODIFICADO: antes solo permitía inscribirse (disabled si
                        // yaInscripto). Ahora alterna inscribirse/desinscribirse
                        // según el estado actual del jugador en el encuentro.
                        <button
                            type="button"
                            disabled={completo && !yaInscripto}
                            onClick={() =>
                                yaInscripto
                                    ? handleDesinscribirseDeTorneo(encuentro._id)
                                    : handleInscribirseEnTorneo(encuentro._id)
                            }
                            className={`
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                font-semibold
                                text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                ${colorBotonTorneo}
                            `}
                        >
                            {yaInscripto
                                ? "Desinscribirme"
                                : completo
                                  ? "Completo"
                                  : "Inscribirme"}
                        </button>
                    )}
            </div>
        </li>
    );
})}
</ul>
                    )}

                </section>

                {/* Jugadores */}
                <section className="mt-6">

                    <h3 className="font-bold text-lg mb-2">
                        Inscriptos
                    </h3>

                    {esJugador && estaInscripto &&
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

                                            {esJugador &&
    estaInscripto &&
    !esUnoMismo && (
        <button
            onClick={() =>
                handleDesafiar(jugador.id)
            }
            disabled={desafiando === jugador.id}
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
            {desafiando === jugador.id
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