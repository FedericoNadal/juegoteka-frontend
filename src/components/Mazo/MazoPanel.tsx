import { useEffect, useState } from "react";

import Deck from "./Deck";
import MessageCard from "./MessageCard";

import { useAuth } from "../../hooks/useAuth";
import {
    obtenerMensajesRecibidos,
    eliminarMensaje
} from "../../services/mensajeService";
import { confirmarParticipacion } from "../../services/encuentroService";

import type { Mensaje } from "../../types/mensaje";

interface MazoPanelProps {
    onResponder: (idRemitente: string) => void;
}

function MazoPanel({ onResponder }: MazoPanelProps) {
    const { usuario, token } = useAuth();

    const [mensajes, setMensajes] = useState<Mensaje[]>([]);
    const [indiceActual, setIndiceActual] = useState(0);

    useEffect(() => {
        async function cargarMensajes() {
            if (!usuario || !token) return;
            try {
                const respuesta = await obtenerMensajesRecibidos(usuario.id, token);
                setMensajes(respuesta.mensajes);
            } catch (error) {
                console.error("No se pudieron cargar los mensajes:", error);
            }
        }
        cargarMensajes();
    }, [usuario, token]);

    function siguienteMensaje() {
        if (mensajes.length === 0) return;
        setIndiceActual((indiceActual + 1) % mensajes.length);
    }

    function quitarMensajeDeLista(idMensaje: string) {
        const nuevos = mensajes.filter((m) => m._id !== idMensaje);
        setMensajes(nuevos);
        setIndiceActual(nuevos.length === 0 ? 0 : Math.min(indiceActual, nuevos.length - 1));
    }

    async function eliminarMensajeActual(idMensaje: string) {
        if (!token) return;
        try {
            await eliminarMensaje(idMensaje, token);
            quitarMensajeDeLista(idMensaje);
        } catch (error) {
            console.error("No se pudo eliminar el mensaje:", error);
        }
    }

    async function confirmarDesafioActual(idEncuentro: string) {
        if (!token || !usuario) return;
        const mensajeActual = mensajes[indiceActual];
        if (!mensajeActual) return;
        try {
            await confirmarParticipacion(idEncuentro, usuario.id, token);
            await eliminarMensajeActual(mensajeActual._id);
        } catch (error) {
            console.error("No se pudo confirmar la participación:", error);
        }
    }

   return (
    <>
        

        {mensajes.length > 0 && (
            <div className="flex justify-center">
                <MessageCard
                    mensaje={mensajes[indiceActual]}
                    onDelete={eliminarMensajeActual}
                    onConfirm={confirmarDesafioActual}
                    onResponder={onResponder}
                />
            </div>
        )}

        <Deck
            onDraw={siguienteMensaje}
            cantidad={mensajes.length}
        />
    </>
);
}

export default MazoPanel;