import { NavLink, Outlet } from "react-router-dom";



export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">

            <main className="flex-1">
                <Outlet />
            </main>

            <nav className="h-16 border-t">
                <nav className="h-16 border-t flex justify-around items-center">
                    <NavLink to="/mazo">Mazo</NavLink>
                    <NavLink to="/mapa">Mapa</NavLink>
                    <NavLink to="/libreta">Libreta</NavLink>
                    <NavLink to="/perfil">Perfil</NavLink>
                </nav>
            </nav>

        </div>
    );
}