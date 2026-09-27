import { API_URL, getHeaders } from "./http";

/**
 * Confirma la participación del jugador logueado en un encuentro.
 * Usado desde el Mazo cuando el propio jugador acepta un desafío.
 */
export async function confirmarParticipacion(
    idEncuentro: string,
    idJugador: string,
    token: string
): Promise<void> {

    const response = await fetch(
        `${API_URL}/encuentros/updatejugadores/${idEncuentro}`,
        {
            method: "PUT",
            headers: getHeaders(token),
            body: JSON.stringify({
                jugadores: [
                    { id_jugador: idJugador, estado: "confirmado" }
                ]
            })
        }
    );

    const data = await response.json();

    console.log("Confirmar participación - Status:", response.status);

    if (!response.ok) {
        throw new Error(
            data.message ||
            "No se pudo confirmar la participación"
        );
    }
}

/**
 * Invita a un jugador nuevo a un encuentro existente.
 * Solo puede hacerlo el creador del encuentro (lo valida el backend).
 * Queda con estado "pendiente" por default, y dispara la notificación
 * en el Mazo del jugador invitado (ver encuentroService.updateJugadores
 * en el backend).
 */
export async function invitarJugadorAEncuentro(
    idEncuentro: string,
    idJugador: string,
    token: string
): Promise<void> {

    const response = await fetch(
        `${API_URL}/encuentros/updatejugadores/${idEncuentro}`,
        {
            method: "PUT",
            headers: getHeaders(token),
            body: JSON.stringify({
                jugadores: [
                    { id_jugador: idJugador }
                ]
            })
        }
    );

    const data = await response.json();

    console.log("Invitar jugador - Status:", response.status);

    if (!response.ok) {
        throw new Error(
            data.message ||
            "No se pudo enviar el desafío"
        );
    }
}

export async function inscribirseEnEncuentro(
    idEncuentro: string,
    idJugador: string,
    token: string
): Promise<void> {
    const response = await fetch(
        `${API_URL}/encuentros/updatejugadores/${idEncuentro}`,
        {
            method: "PUT",
            headers: getHeaders(token),
            body: JSON.stringify({
                jugadores: [
                    {
                        id_jugador: idJugador,
                        estado: "confirmado"
                    }
                ]
            })
        }
    );

    const data = await response.json();

    console.log("Inscripción al encuentro - Status:", response.status);

    if (!response.ok) {
        throw new Error(
            data.message ||
            "No se pudo realizar la inscripción"
        );
    }
}

/**
 * Cancela la inscripción del jugador logueado a un encuentro de tipo "torneo".
 * El backend toma el id del jugador desde el token (req.user.id), no desde
 * el body: un jugador solo puede desinscribirse a sí mismo, no a otros.
 */
export async function cancelarInscripcionEncuentro(
idEncuentro: string,
token: string
): Promise<void> {

const response = await fetch(
`${API_URL}/encuentros/cancelarinscripcion/${idEncuentro}`,
        {
method: "PUT",
headers: getHeaders(token)
        }
    );

const data = await response.json();

    console.log("Cancelar inscripción a encuentro - Status:", response.status);

if (!response.ok) {
throw new Error(
            data.message ||
"No se pudo cancelar la inscripción al encuentro"
        );
    }
}