
import {
    API_URL,
    getHeaders
} from "./http";

import type {
    LoginCredentials,
    AuthResponse,
    RegisterData
} from "../types/auth";

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
    const data = await response.json();

    if (response.status === 401) {
        throw new Error("Usuario o contraseña incorrectos");
    }

    throw new Error(
        data.message || "No se pudo iniciar sesión"
    );
}

    return response.json();
}

export async function register(
    data: RegisterData
) {

    const response = await fetch(
        `${API_URL}/usuarios/registrar`,
        {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        throw new Error(
            "Error al crear la cuenta"
        );
    }

    return response.json();
}