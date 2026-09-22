import type { MensajesResponse } from "../types/mensaje";

import {
    API_URL,
    getHeaders
} from "./http";


/**
 * Obtiene los mensajes recibidos por un usuario.
 *
 * El backend devuelve los mensajes paginados
 * correspondientes al destinatario indicado.
 */
export async function obtenerMensajesRecibidos(
    idUsuario: string,
    token: string
): Promise<MensajesResponse> {

    const response = await fetch(
        `${API_URL}/mensajes/destinatario/${idUsuario}`,
        {
            method: "GET",
            headers: getHeaders(token)
        }
    );

    const data = await response.json();

    console.log(
        "Mensajes - Status:",
        response.status
    );

    console.log(
        "Mensajes - OK:",
        response.ok
    );

    console.log(
        "Mensajes - Respuesta:",
        data
    );

    if (!response.ok) {
        throw new Error(
            data.message ||
            "No se pudieron obtener los mensajes"
        );
    }

    return data;
}


/**
 * Elimina un mensaje.
 */
export async function eliminarMensaje(
    idMensaje: string,
    token: string
): Promise<void> {

    const response = await fetch(
        `${API_URL}/mensajes/delete/${idMensaje}`,
        {
            method: "DELETE",
            headers: getHeaders(token)
        }
    );

    const data = await response.json();

    console.log(
        "Eliminar mensaje - Status:",
        response.status
    );

    if (!response.ok) {
        throw new Error(
            data.message ||
            "No se pudo eliminar el mensaje"
        );
    }
}

export interface CrearMensajeData {
    remitente: string;
    destinatario: string;
    contenido: string;
}
//enviar
//////////////////////

export async function enviarMensaje(
    data: CrearMensajeData,
    token: string
): Promise<void> {

    const response = await fetch(
        `${API_URL}/mensajes/create`,
        {
            method: "POST",
            headers: {
                ...getHeaders(token),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const responseData = await response.json();

    console.log(
        "Enviar mensaje - Status:",
        response.status
    );

    console.log(
        "Enviar mensaje - OK:",
        response.ok
    );

    console.log(
        "Enviar mensaje - Respuesta:",
        responseData
    );

    if (!response.ok) {
        throw new Error(
            responseData.message ||
            "No se pudo enviar el mensaje"
        );
    }
}