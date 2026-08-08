
import {
    createContext,
    useEffect,
    useState,
    type ReactNode
} from "react";

import type { Usuario } from "../types/usuario";
import type { LoginCredentials } from "../types/auth";

import {
    login as loginService,
    obtenerPerfil
} from "../services/authService";


// ============================================================
// TIPO DEL CONTEXTO
// Define qué información y acciones estarán disponibles
// para los componentes que necesiten autenticación.
// ============================================================

interface AuthContextType {
    usuario: Usuario | null;
    token: string | null;
    isAuthenticated: boolean;

    login(
        credentials: LoginCredentials
    ): Promise<void>;

    logout(): void;
}


// ============================================================
// CONTEXTO
// ============================================================

export const AuthContext =
    createContext<AuthContextType | undefined>(undefined);


// ============================================================
// PROVIDER
// Mantiene el estado global de autenticación.
// ============================================================

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children
}: AuthProviderProps) {

    // Usuario actualmente autenticado.
    const [usuario, setUsuario] =
        useState<Usuario | null>(null);

    // JWT utilizado para autenticar las peticiones.
    const [token, setToken] =
        useState<string | null>(null);


    // ========================================================
    // RESTAURAR SESIÓN
    //
    // Al recargar la aplicación buscamos el JWT guardado.
    // Si existe, consultamos el perfil para recuperar
    // los datos del usuario.
    // ========================================================

    useEffect(() => {

        async function restaurarSesion() {

            const tokenGuardado =
                localStorage.getItem("token");

            if (!tokenGuardado) {
                return;
            }

            try {

                const usuario =
                    await obtenerPerfil(tokenGuardado);

                setToken(tokenGuardado);
                setUsuario(usuario);

            } catch (error) {

                console.error(
                    "No se pudo restaurar la sesión:",
                    error
                );

                localStorage.removeItem("token");

                setToken(null);
                setUsuario(null);
            }
        }

        restaurarSesion();

    }, []);


    // ========================================================
    // LOGIN
    //
    // Envía las credenciales al servicio de autenticación.
    // Si el backend responde correctamente, guardamos:
    //   - usuario
    //   - JWT
    // ========================================================

    async function login(
        credentials: LoginCredentials
    ) {

        const response =
            await loginService(credentials);

        console.log("LOGIN OK:", response);

        localStorage.setItem(
            "token",
            response.token
        );

        setUsuario(response.usuario);
        setToken(response.token);
    }


    // ========================================================
    // LOGOUT
    // ========================================================

    function logout() {

        localStorage.removeItem("token");

        setUsuario(null);
        setToken(null);
    }


    // ========================================================
    // VALORES COMPARTIDOS
    // ========================================================

    return (

        <AuthContext.Provider
            value={{
                usuario,
                token,

                // Si existe usuario, consideramos
                // que existe una sesión activa.
                isAuthenticated:
                    usuario !== null,

                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}

