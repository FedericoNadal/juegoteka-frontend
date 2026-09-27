export const API_URL =
    import.meta.env.VITE_API_URL;


/**
 * Agrega los headers comunes de nuestras
 * peticiones a la API.
 *
 * Si existe un token, lo envía como:
 *
 * Authorization: Bearer <token>
 */
export function getHeaders(token?: string) {

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] =
            `Bearer ${token}`;
    }

    return headers;
}