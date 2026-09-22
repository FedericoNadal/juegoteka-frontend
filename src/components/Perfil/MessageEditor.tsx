import { useEffect, useState } from "react";

import Button from "../../components/ui/Button";

import { useAuth } from "../../hooks/useAuth";
import { obtenerJugadores } from "../../services/usuarioService";
import { enviarMensaje } from "../../services/mensajeService";

import type { Usuario } from "../../types/usuario";

interface MessageEditorProps {
    destinatarioIdInicial?: string;
}

function MessageEditor({
    destinatarioIdInicial
}: MessageEditorProps) {

    const { usuario, token } = useAuth();

    const [abierto, setAbierto] = useState(
        Boolean(destinatarioIdInicial)
    );

    const [jugadores, setJugadores] =
        useState<Usuario[]>([]);

    const [destinatarioId, setDestinatarioId] =
        useState(destinatarioIdInicial ?? "");

    const [contenido, setContenido] =
        useState("");

    const [cargandoJugadores, setCargandoJugadores] =
        useState(false);

    const [enviando, setEnviando] =
        useState(false);

    useEffect(() => {

        setDestinatarioId(
            destinatarioIdInicial ?? ""
        );

        if (destinatarioIdInicial) {
            setAbierto(true);
        }

    }, [destinatarioIdInicial]);

    useEffect(() => {

        async function cargarJugadores() {

            if (!token || !abierto) {
                return;
            }

            try {

                setCargandoJugadores(true);

                const jugadoresObtenidos =
                    await obtenerJugadores(token);

                setJugadores(jugadoresObtenidos);

            } catch (error) {

                console.error(
                    "No se pudieron cargar los jugadores:",
                    error
                );

            } finally {

                setCargandoJugadores(false);

            }
        }

        cargarJugadores();

    }, [token, abierto]);

    async function handleEnviar() {

        if (!token || !usuario) {
            return;
        }

        if (!destinatarioId) {
            alert("Seleccioná un destinatario.");
            return;
        }

        if (!contenido.trim()) {
            alert("Escribí un mensaje.");
            return;
        }

        try {

            setEnviando(true);

            await enviarMensaje(
                {
                    remitente: usuario.id,
                    destinatario: destinatarioId,
                    contenido: contenido.trim()
                },
                token
            );

            setContenido("");

            setDestinatarioId("");

            setAbierto(false);

            alert("Carta enviada.");

        } catch (error) {

            console.error(
                "No se pudo enviar la carta:",
                error
            );

            alert("No se pudo enviar la carta.");

        } finally {

            setEnviando(false);

        }
    }

    return (
        <section
            className="
                rounded-xl
                bg-amber-50
                shadow
                overflow-hidden
            "
        >

            <button
                type="button"
                onClick={() => setAbierto(!abierto)}
                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    p-5
                    text-left
                    font-title
                    text-xl
                "
            >
                <span>Escribir una carta</span>

                <span>
                    {abierto ? "⌃" : "⌄"}
                </span>
            </button>

            {abierto && (

                <div className="px-5 pb-5">

                    <div className="mb-5">

                        <label
                            htmlFor="destinatario"
                            className="
                                block
                                font-semibold
                                mb-2
                            "
                        >
                            Destinatario
                        </label>

                        <select
                            id="destinatario"
                            value={destinatarioId}
                            onChange={(event) =>
                                setDestinatarioId(
                                    event.target.value
                                )
                            }
                            disabled={cargandoJugadores}
                            className="
                                w-full
                                rounded-lg
                                border
                                border-amber-300
                                bg-white
                                p-3
                            "
                        >

                            <option value="">
                                {cargandoJugadores
                                    ? "Cargando jugadores..."
                                    : "Seleccioná un jugador"
                                }
                            </option>

                            {jugadores.map((jugador) => (

                                <option
                                    key={jugador.id}
                                    value={jugador.id}
                                >
                                    {jugador.userName}
                                </option>

                            ))}

                        </select>

                    </div>

                    <textarea
                        rows={8}
                        value={contenido}
                        onChange={(event) =>
                            setContenido(event.target.value)
                        }
                        placeholder="Escribí tu mensaje..."
                        className="
                            w-full
                            rounded-lg
                            border
                            border-amber-300
                            p-3
                            resize-none
                        "
                    />

                    <div className="mt-6">

                        <Button
                            onClick={handleEnviar}
                            disabled={enviando}
                        >
                            {enviando
                                ? "Enviando..."
                                : "✉ Enviar"
                            }
                        </Button>

                    </div>

                </div>
            )}

        </section>
    );
}

export default MessageEditor;