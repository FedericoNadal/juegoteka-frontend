import type { Jornada } from "../types/jornada";

import {
    API_URL,
    getHeaders
} from "./http";


/**
 * Obtiene todas las jornadas.
 *
 * Las jornadas son públicas para cualquier
 * usuario autenticado según el backend.
 */
export async function obtenerJornadas(): Promise<Jornada[]> {

    const response = await fetch(
        `${API_URL}/jornadas`,
        {
            method: "GET",
            headers: getHeaders()
        }
    );

    console.log(
        "Jornadas - Status:",
        response.status
    );

    console.log(
        "Jornadas - OK:",
        response.ok
    );

    if (!response.ok) {

        throw new Error(
            "No se pudieron obtener las jornadas"
        );

    }

    return response.json();
}
/**
 * Obtiene una jornada por ID.
 *
 * El backend devuelve además los encuentros
 * asociados mediante populate.
 */
export async function obtenerJornadaPorId(
    _id: string
): Promise<Jornada> {

    const response = await fetch(
        `${API_URL}/jornadas/${_id}`,
        {
            method: "GET",
            headers: getHeaders()
        }
    );

    console.log(
        "Jornada - Status:",
        response.status
        
    );
    

    if (!response.ok) {

        throw new Error(
            "No se pudo obtener la jornada"
        );

    }

    return response.json();
}

/**
 * Obtiene las jornadas en las que está inscripto
 * el jugador autenticado.
 */
export async function obtenerMisJornadas(
    token: string
) {

    const response = await fetch(
        `${API_URL}/jornadas/misJornadas`,
        {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "No se pudieron obtener mis jornadas"
        );
    }

    return data;
}



/**
 * Inscribe al jugador logueado en una jornada.
 */
export async function inscribirseEnJornada(
    idJornada: string,
    token: string
): Promise<Jornada> {

    const response = await fetch(
        `${API_URL}/jornadas/inscripcion/${idJornada}`,
        {
            method: "PUT",
            headers: getHeaders(token)
        }
    );

    console.log(
        "Inscripción - Status:",
        response.status
    );

    console.log(
        "Inscripción - OK:",
        response.ok
    );

    /*
     * Intentamos leer siempre la respuesta.
     * Esto nos permite ver el mensaje que genera
     * showErrorMessage() en el backend.
     */
    const data = await response.json();

    console.log(
        "Inscripción - Respuesta:",
        data
    );

    if (!response.ok) {

        throw new Error(
            data.message ||
            "No se pudo realizar la inscripción"
        );

    }

    return data;
}

export async function cancelarInscripcionJornada(
    token: string,
    idJornada: string
) {

    const response = await fetch(
        `${API_URL}/jornadas/cancelarInscripcion/${idJornada}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo cancelar la inscripción"
        );
    }

    return response.json();
}