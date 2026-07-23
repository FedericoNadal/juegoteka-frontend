import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/ui/Header";

/**
 * Layout principal de la aplicación.
 *
 * La estructura busca una experiencia similar a una app móvil:
 *
 * - Header fijo arriba
 * - Contenido central con scroll independiente
 * - Barra de navegación fija abajo
 *
 * De esta forma páginas largas (ej: catálogo de juegos)
 * no pierden la navegación principal.
 */
export default function MainLayout() {

    return (

        <div className="
            h-screen
            flex
            flex-col
            overflow-hidden
        ">


            {/* 
                Zona superior fija.
                No participa del scroll del contenido.
            */}
            <header>

                <Header />

            </header>



            {/*
                Única zona desplazable.

                pb-20 deja espacio para que el último
                elemento no quede oculto detrás de la navegación.
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



            {/*
                Navegación principal móvil.

                fixed hace que permanezca visible
                aunque el usuario haga scroll.
            */}
            <nav
                className="
                    fixed
                    bottom-0
                    left-0
                    w-full
                    h-16
                    border-t
                    bg-white
                    flex
                    justify-around
                    items-center
                "
            >

                <NavLink to="/mazo">
                    Mazo
                </NavLink>

                <NavLink to="/mapa">
                    Mapa
                </NavLink>

                <NavLink to="/libreta">
                    Libreta
                </NavLink>

                <NavLink to="/perfil">
                    Perfil
                </NavLink>

            </nav>


        </div>

    );
}