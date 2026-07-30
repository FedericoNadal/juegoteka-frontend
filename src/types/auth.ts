import type { Usuario } from "./usuario";

export interface LoginCredentials {
   userName: string;
    pass: string;
}


export interface AuthResponse {
    message: string;
    token: string;
    usuario: Usuario;
}