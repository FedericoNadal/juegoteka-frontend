import {
    createContext,
    useState,
    type ReactNode
} from "react";

import type { Usuario } from "../types/usuario";
import type { LoginCredentials } from "../types/auth";

import {
    login as loginService
} from "../services/authService";



/*
    Este tipo define qué información y acciones
    estarán disponibles para cualquier componente
    que necesite autenticación.

    Ejemplos:
    - Header necesita saber si hay usuario conectado.
    - Perfil necesita obtener los datos del usuario.
    - Logout necesita cerrar la sesión.
*/
interface AuthContextType {

    usuario: Usuario | null;

    token: string | null;

    isAuthenticated: boolean;


    /*
        Función que inicia sesión.

        Recibe credenciales y delega la comunicación
        con el backend al authService.
    */
    login(
        credentials: LoginCredentials
    ): Promise<void>;


    /*
        Elimina la sesión actual.
    */
    logout(): void;

}



/*
    createContext crea el "canal" mediante el cual
    los componentes podrán acceder al estado
    de autenticación.

    Inicialmente no existe ningún proveedor,
    por eso usamos undefined.
*/
export const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    );




interface AuthProviderProps {

    /*
        children representa todos los componentes
        que estarán dentro del proveedor.

        Ejemplo:

        <AuthProvider>
            <App />
        </AuthProvider>

        App y todo lo que contiene son children.
    */
    children: ReactNode;

}




/*
    AuthProvider es el componente que mantiene
    el estado global de autenticación.

    Todo componente hijo podrá acceder
    a este estado mediante useAuth().
*/
export function AuthProvider({
    children
}: AuthProviderProps) {



    /*
        Guarda el usuario actualmente autenticado.

        null significa:
        "nadie inició sesión todavía".
    */
    const [usuario, setUsuario] =
        useState<Usuario | null>(null);



    /*
        Guarda el JWT recibido del backend.

        Más adelante será utilizado para enviar:

        Authorization: Bearer <token>
    */
    const [token, setToken] =
        useState<string | null>(null);




    /*
        Función principal de autenticación.

        Flujo:

        LoginForm
            |
            v
        AuthContext.login()
            |
            v
        authService.login()
            |
            v
        Backend Express
            |
            v
        token + usuario

    */
    async function login(
        credentials: LoginCredentials
    ) {


        const response =
            await loginService(credentials);



        /*
            Guardamos la respuesta del backend
            dentro del estado global.
        */
        setUsuario(response.usuario);

        setToken(response.token);

    }





    /*
        Cierra la sesión eliminando
        la información almacenada en React.
    */
    function logout(){

        setUsuario(null);

        setToken(null);

    }





    return (

        /*
            Provider comparte el estado con todos
            sus componentes hijos.

            Cualquier componente dentro de este árbol
            podrá acceder a:

            usuario
            token
            login()
            logout()
        */
        <AuthContext.Provider

            value={{

                usuario,

                token,


                /*
                    Derivamos este valor.

                    No necesitamos otro estado.
                    Si existe usuario,
                    entonces está autenticado.
                */
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