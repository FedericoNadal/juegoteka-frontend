import type { LoginCredentials, AuthResponse } from "../types/auth";


const API_URL = import.meta.env.VITE_API_URL;


/**
 * Servicio de autenticación.
 *
 * Este módulo encapsula la comunicación
 * con el backend Node + Express.
 *
 * No maneja:
 * - estado React
 * - localStorage
 * - navegación
 *
 * Solo comunica datos.
 */


export async function login(
    credentials: LoginCredentials
): Promise<AuthResponse> {


    const response = await fetch(
        `${API_URL}/usuarios/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }
    );


    if (!response.ok) {

        throw new Error(
            "Error al iniciar sesión"
        );

    }


    const data: AuthResponse =
        await response.json();


    return data;
}