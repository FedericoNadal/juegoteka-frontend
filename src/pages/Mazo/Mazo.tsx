import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Deck from "../../components/Mazo/Deck";
import MessageCard from "../../components/Mazo/MessageCard";
import Container from "../../components/ui/Container";

import { useAuth } from "../../hooks/useAuth";
import {
    obtenerMensajesRecibidos,
    eliminarMensaje
} from "../../services/mensajeService";
import { confirmarParticipacion } from "../../services/encuentroService";

import type { Mensaje } from "../../types/mensaje";

function Mazo() {
const { usuario, token } = useAuth();
const navigate = useNavigate();

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

function siguienteMensaje() {
if (mensajes.length === 0) return;

setIndiceActual(
            (indiceActual + 1) % mensajes.length
        );
    }

function quitarMensajeDeLista(idMensaje: string) {
const nuevosMensajes = mensajes.filter(
            (mensaje) => mensaje._id !== idMensaje
        );

setMensajes(nuevosMensajes);

if (nuevosMensajes.length === 0) {
setIndiceActual(0);
return;
        }

setIndiceActual(
Math.min(
indiceActual,
nuevosMensajes.length - 1
            )
        );
    }

async function eliminarMensajeActual(idMensaje: string) {
if (!token) return;

try {
await eliminarMensaje(idMensaje, token);
quitarMensajeDeLista(idMensaje);

        } catch (error) {
console.error(
"No se pudo eliminar el mensaje:",
error
            );
        }
    }

async function confirmarDesafioActual(idEncuentro: string) {
if (!token || !usuario) return;

const mensajeActual = mensajes[indiceActual];
if (!mensajeActual) return;

try {
await confirmarParticipacion(
                idEncuentro,
usuario.id,
token
            );

await eliminarMensajeActual(mensajeActual._id);

        } catch (error) {
console.error(
"No se pudo confirmar la participación:",
error
            );
        }
    }

    /**
     * Navega a la Libreta pasando el id del remitente para
     * que el editor lo tenga preseleccionado como destinatario
     * de la respuesta.
     */
function responderMensaje(idRemitente: string) {
navigate("/perfil", {
state: { destinatarioId: idRemitente }
        });
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
onDelete={eliminarMensajeActual}
onConfirm={confirmarDesafioActual}
onResponder={responderMensaje}
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