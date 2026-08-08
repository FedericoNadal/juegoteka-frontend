
import type { LoginCredentials, AuthResponse } from "../types/auth";
import type { Usuario } from "../types/usuario";

import { API_URL, getHeaders } from "./http";

//const API_URL = import.meta.env.VITE_API_URL;

/**
 * Servicio de autenticación.
 *
 * Este módulo encapsula la comunicación
 * con el backend Node + Express.
 *
 * No maneja:
 *
 * - estado React
 * - localStorage
 * - navegación
 *
 * Solo comunica datos.
 */

/**
 * Inicia sesión en el backend.
 *
 * Envía las credenciales y recibe:
 * - token JWT
 * - datos del usuario
 */
export async function login(
    credentials: LoginCredentials
): Promise<AuthResponse> {

   const response = await fetch(
    `${API_URL}/usuarios/login`,
    {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(credentials)
    }
);

    console.log("Status:", response.status);
    console.log("OK:", response.ok);

    if (!response.ok) {

        throw new Error(
            "Error al iniciar sesión"
        );

    }

    const data: AuthResponse =
        await response.json();

    return data;
}


/**
 * Obtiene el perfil del usuario autenticado.
 *
 * Recibe el JWT y lo envía al backend
 * mediante el header Authorization.
 *
 * El backend valida el token y devuelve
 * los datos del usuario.
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

    console.log("Perfil - Status:", response.status);
    console.log("Perfil - OK:", response.ok);

    if (!response.ok) {

        throw new Error(
            "No se pudo obtener el perfil"
        );

    }

    const usuario: Usuario =
        await response.json();

    return usuario;
}

