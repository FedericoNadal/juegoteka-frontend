import {
    useContext
} from "react";

import {
    AuthContext
} from "../context/AuthContext";



/*
    Hook personalizado para acceder
    al contexto de autenticación.

    Evita repetir useContext(AuthContext)
    en todos los componentes.
*/
export function useAuth() {


    const context =
        useContext(AuthContext);



    /*
        Si alguien usa useAuth()
        fuera de AuthProvider,
        significa que la arquitectura
        está mal conectada.

        Lanzamos un error claro.
    */
    if (!context) {

        throw new Error(
            "useAuth debe utilizarse dentro de AuthProvider"
        );

    }


    return context;

}