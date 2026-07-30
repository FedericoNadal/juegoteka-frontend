export interface Usuario {
    id: string;

    userName: string;

    rol: "jugador" | "juegoteka" | "administrador";

    nombre: string;
    apellido: string;

    direccion: string;
    telefono: string;
    mail: string;

    foto?: string;
}