import type {
    LoginCredentials,
    AuthResponse
} from "../types/auth";

import {
    API_URL,
    getHeaders
} from "./http";


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

    console.log(
        "Status:",
        response.status
    );

    console.log(
        "OK:",
        response.ok
    );

    if (!response.ok) {
        throw new Error(
            "Error al iniciar sesión"
        );
    }

    return response.json();
}