import { useEffect, useState } from "react";

import Deck from "../../components/Mazo/Deck";
import MessageCard from "../../components/Mazo/MessageCard";
import Container from "../../components/ui/Container";

import { useAuth } from "../../hooks/useAuth";
import { obtenerMensajesRecibidos } from "../../services/mensajeService";

import type { Mensaje } from "../../types/mensaje";

/**
 * Página principal del Mazo.
 *
 * Obtiene los mensajes del usuario autenticado
 * y permite recorrerlos uno por uno.
 */
function Mazo() {
    const { usuario, token } = useAuth();

    const [mensajes, setMensajes] = useState<Mensaje[]>([]);
    const [indiceActual, setIndiceActual] = useState(0);

    useEffect(() => {
        async function cargarMensajes() {
            if (!usuario || !token) return;

            try {
                const respuesta = await obtenerMensajesRecibidos(
                    usuario.id,
                    token
                );

                console.log(
                    "Mazo - Mensajes recibidos:",
                    respuesta
                );

                setMensajes(respuesta.mensajes);
            } catch (error) {
                console.error(
                    "No se pudieron cargar los mensajes:",
                    error
                );
            }
        }

        cargarMensajes();
    }, [usuario, token]);

    /**
     * Avanza hacia el siguiente mensaje.
     *
     * luego del ultimo, vuelve al primero.
     */
    function siguienteMensaje() {
    if (mensajes.length === 0) return;

    setIndiceActual(
        (indiceActual + 1) % mensajes.length
    );
}
    return (
        <main>
            <Container>
                <section
                    className="
                        flex
                        flex-col
                        items-center
                        gap-8
                        py-8
                    "
                >
                    {mensajes.length > 0 && (
                        <div className="flex justify-center">
                            <MessageCard
                                mensaje={mensajes[indiceActual]}
                            />
                        </div>
                    )}

                    <div className="flex justify-end pl-50">
                        <Deck
                            onDraw={siguienteMensaje}
                           
                        />
                    </div>
                </section>
            </Container>
        </main>
    );
}

export default Mazo;