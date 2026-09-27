import type {
    Usuario,
    Ubicacion
} from "./usuario";

export interface LoginCredentials {
    userName: string;
    pass: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    usuario: Usuario;
}

export interface RegisterData {
    userName: string;
    pass: string;

    rol:
        | "jugador"
        | "juegoteka";

    nombre: string;
    apellido: string;

    foto?: string;

    direccion: string;
    telefono: string;
    mail: string;

    ubicacion: Ubicacion;
}

