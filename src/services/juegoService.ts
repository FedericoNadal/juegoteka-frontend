import type { Juego } from "../types/juego";

import {
    API_URL,
    getHeaders
} from "./http";

/**
 * Obtiene todos los juegos disponibles
 * en el catálogo.
 *
 * El endpoint actualmente es público,
 * por lo que no necesitamos enviar JWT.
 */
export async function obtenerJuegos(): Promise<Juego[]> {

    const response = await fetch(
        `${API_URL}/juegos`,
        {
            method: "GET",
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo obtener el catálogo de juegos"
        );
    }

    return response.json();
}

/**
 * Agrega un juego a la colección
 * del usuario actualmente autenticado.
 *
 * El backend obtiene el usuario
 * desde el JWT.
 */
export async function agregarAMisJuegos(
    token: string,
    idJuego: string
) {

    const response = await fetch(
        `${API_URL}/usuarios/misJuegos/${idJuego}`,
        {
            method: "PUT",
            headers: getHeaders(token)
        }
    );

    console.log("Agregar juego - Status:", response.status);
    console.log("Agregar juego - OK:", response.ok);

    const data = await response.json();

    console.log("Agregar juego - Respuesta:", data);

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudo agregar el juego"
        );
    }

    return data;
}
export async function eliminarDeMisJuegos(
    token: string,
    idJuego: string
) {

    const response = await fetch(
        `${API_URL}/usuarios/misJuegos/${idJuego}`,
        {
            method: "DELETE",
            headers: getHeaders(token)
        }
    );

    console.log(
        "Eliminar juego - Status:",
        response.status
    );

    const data = await response.json();

    console.log(
        "Eliminar juego - Respuesta:",
        data
    );

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudo eliminar el juego"
        );
    }

    return data;
}