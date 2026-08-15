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
    id: string
): Promise<Jornada> {

    const response = await fetch(
        `${API_URL}/jornadas/${id}`,
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