import type { Usuario, JuegosUsuario } from "../types/usuario";

import {
    API_URL,
    getHeaders
} from "./http";

/**
 * Obtiene los datos del usuario
 * actualmente autenticado.
 *
 * El backend identifica al usuario
 * mediante el JWT.
 */
export async function obtenerPerfil(
    token: string
): Promise<Usuario> {

    const response = await fetch(
        `${API_URL}/usuarios/getPerfil`,
        {
            method: "GET",
            headers: getHeaders(token)
        }
    );

    console.log(
        "Perfil - Status:",
        response.status
    );

    console.log(
        "Perfil - OK:",
        response.ok
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo obtener el perfil"
        );
    }

    return response.json();
}


/**
 * Obtiene los juegos del usuario
 * actualmente autenticado.
 *
 * El backend identifica al usuario
 * mediante el JWT.
 */
export async function obtenerMisJuegos(
    token: string
): Promise<JuegosUsuario[]> {

    const response = await fetch(
        `${API_URL}/usuarios/misJuegos`,
        {
            method: "GET",
            headers: getHeaders(token)
        }
    );

    console.log(
        "Mis juegos - Status:",
        response.status
    );

    console.log(
        "Mis juegos - OK:",
        response.ok
    );

    if (!response.ok) {
        throw new Error(
            "No se pudieron obtener los juegos"
        );
    }

    return response.json();
}
/**
 * Obtiene todas las Juegotekas registradas.
 *
 * Se utilizan para mostrarlas en el mapa.
 */
export async function obtenerJuegotekas(
    token: string
): Promise<Usuario[]> {

    const response = await fetch(
        `${API_URL}/usuarios/getJuegotekas`,
        {
            method: "GET",
            headers: getHeaders(token)
        }
    );

    console.log(
        "Juegotekas - Status:",
        response.status
    );

    console.log(
        "Juegotekas - OK:",
        response.ok
    );

    if (!response.ok) {
        throw new Error(
            "No se pudieron obtener las juegotekas"
        );
    }

    return response.json();
}