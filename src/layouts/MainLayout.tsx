import { Outlet } from "react-router-dom";

import Header from "../components/ui/Header";
import BottomNav from "../components/ui/BottomNav";
import fondo from "../assets/images/background.jpeg";

/**
 * Layout principal de la aplicación.
 *
 * Define la estructura permanente de Juegoteka:
 *
 *  - Header superior.
 *  - Contenido principal.
 *  - Barra de navegación inferior.
 *
 * El único elemento que realiza scroll es el contenido
 * central (<Outlet />), permitiendo mantener siempre
 * visible la navegación.
 */
export default function MainLayout() {

    return (

        <div
            className="
                h-screen
                flex
                flex-col
                overflow-hidden
            "
            style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
        >

            {/* Cabecera permanente */}
            <Header />

            {/*
                Área de contenido.

                flex-1 hace que ocupe todo el espacio
                disponible entre Header y BottomNav.

                overflow-y-auto permite que únicamente
                esta región tenga scroll.

                pb-20 evita que el contenido quede
                oculto detrás de la navegación fija.
            */}
            <main
                className="
                    flex-1
                    overflow-y-auto
                    pb-20
                "
            >

                <Outlet />

            </main>

            {/* Navegación principal */}
            <BottomNav />

        </div>

    );

}