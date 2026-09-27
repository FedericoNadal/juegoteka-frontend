export interface Ubicacion {
    type: "Point";
    coordinates: [number, number];
}

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

    ubicacion?: Ubicacion;
}

export interface JuegosUsuario {
    id: string;
    titulo: string;
    imagen: string;
}

export interface UpdateUsuarioData {
    nombre: string;
    apellido: string;
    foto?: string;
    aboutMe?: string;
    telefono: string;
    mail: string;
    direccion: string;
    ubicacion?: Ubicacion;
}