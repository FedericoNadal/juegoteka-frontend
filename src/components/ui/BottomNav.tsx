import { NavLink } from "react-router-dom";

/**
 * BottomNav
 *
 * Barra de navegación principal de la aplicación.
 *
 * Permanece fija en la parte inferior de la pantalla
 * para facilitar el acceso permanente a las secciones
 * principales desde dispositivos móviles.
 */
function BottomNav() {

    return (

        <nav
            className="
                fixed
                bottom-0
                left-0

                w-full
                h-16

                bg-amber-50
                border-t

                flex
                justify-around
                items-center

                shadow-md
            "
        >

            <NavLink to="/mazo"
                className={({ isActive }) =>
                    isActive
                        ? "font-semibold text-amber-700"
                        : "text-gray-600"
                }>
               🂠 Mazo
            </NavLink>

            <NavLink to="/mapa" className={({ isActive }) =>
                isActive
                    ? "font-semibold text-amber-700"
                    : "text-gray-600"
            }>
              🌍  Mapa
            </NavLink>

            <NavLink to="/libreta" className={({ isActive }) =>
                isActive
                    ? "font-semibold text-amber-700"
                    : "text-gray-600"
            }>
                📝  Libreta
            </NavLink>

            <NavLink to="/perfil" className={({ isActive }) =>
                isActive
                    ? "font-semibold text-amber-700"
                    : "text-gray-600"
            }>
               👤 Perfil
            </NavLink>

        </nav>

    );

}

export default BottomNav;