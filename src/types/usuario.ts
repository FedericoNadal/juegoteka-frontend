export interface Usuario {
    id: string;

    userName: string;

    rol:
        | "jugador"
        | "juegoteka"
        | "administrador";

    nombre: string;
    apellido: string;

    foto?: string;
    aboutMe?: string;

    direccion: string;
    telefono: string;
    mail: string;
}

export interface JuegosUsuario {
    id: string;
    titulo: string;
    imagen: string;
}