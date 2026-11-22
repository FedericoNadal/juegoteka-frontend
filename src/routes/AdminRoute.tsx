import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/ui/Spinner";

function AdminRoute() {
    const { usuario, isAuthenticated, cargandoSesion } = useAuth();

    if (cargandoSesion) {
        return <Spinner label="Verificando sesión..." />;
    }

    if (!isAuthenticated || usuario?.rol !== "administrador") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;