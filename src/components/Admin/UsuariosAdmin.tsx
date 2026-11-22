import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { obtenerUsuarios, eliminarUsuario } from "../../services/usuarioService";

import type { UsuarioAdmin } from "../../types/usuario";

import Spinner from "../ui/Spinner";

function UsuariosAdmin() {
    const { token, usuario: usuarioActual } = useAuth();

    const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function cargarUsuarios() {
            if (!token) {
                setError("No se encontró una sesión válida.");
                setCargando(false);
                return;
            }

            try {
                const usuariosObtenidos = await obtenerUsuarios(token);
                setUsuarios(usuariosObtenidos);
            } catch (error) {
                console.error("Error al cargar usuarios:", error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudo cargar el listado de usuarios."
                );
            } finally {
                setCargando(false);
            }
        }

        cargarUsuarios();
    }, [token]);

    function nombreCompleto(usuario: UsuarioAdmin) {
        return `${usuario.nombre} ${usuario.apellido}`;
    }

    function colorRol(rol: UsuarioAdmin["rol"]) {
        switch (rol) {
            case "administrador":
                return "bg-red-100 text-red-800";
            case "juegoteka":
                return "bg-green-100 text-green-800";
            default:
                return "bg-blue-100 text-blue-800";
        }
    }

    async function handleEliminarUsuario(usuarioAEliminar: UsuarioAdmin) {
        const confirmado = window.confirm(
            `¿Estás seguro de que querés eliminar a ${nombreCompleto(usuarioAEliminar)} (@${usuarioAEliminar.userName})? Esta acción no se puede deshacer.`
        );

        if (!confirmado || !token) return;

        try {
            await eliminarUsuario(usuarioAEliminar.id, token);

            setUsuarios(usuariosActuales =>
                usuariosActuales.filter(
                    usuario => usuario.id !== usuarioAEliminar.id
                )
            );
        } catch (error) {
            console.error("Error al eliminar usuario:", error);

            window.alert(
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar el usuario."
            );
        }
    }

    if (cargando) {
        return (
            <div className="flex justify-center py-12">
                <Spinner label="Cargando usuarios..." />
            </div>
        );
    }

    if (error) {
        return (
            <p className="rounded-lg bg-red-100 p-4 text-red-800">
                {error}
            </p>
        );
    }

    return (
        <>
            <p className="mb-6 text-amber-900">
                Total de usuarios: <strong>{usuarios.length}</strong>
            </p>

            {usuarios.length === 0 ? (
                <p className="text-amber-800">
                    No hay usuarios registrados.
                </p>
            ) : (
                <>
                    {/* Tabla para pantallas medianas y grandes */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-amber-900/30 text-amber-900">
                                    <th className="p-3">Nombre</th>
                                    <th className="p-3">Usuario</th>
                                    <th className="p-3">Rol</th>
                                    <th className="p-3">Correo</th>
                                    <th className="p-3">Teléfono</th>
                                    <th className="p-3">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr
                                        key={usuario.id}
                                        className="border-b border-amber-900/10 hover:bg-amber-50"
                                    >
                                        <td className="p-3 font-semibold text-amber-950">
                                            {nombreCompleto(usuario)}
                                        </td>

                                        <td className="p-3">
                                            {usuario.userName}
                                        </td>

                                        <td className="p-3">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colorRol(usuario.rol)}`}>
                                                {usuario.rol}
                                            </span>
                                        </td>

                                        <td className="p-3">
                                            {usuario.mail || "—"}
                                        </td>

                                        <td className="p-3">
                                            {usuario.telefono || "—"}
                                        </td>

                                        <td className="p-3">
                                            {usuario.id !== usuarioActual?.id && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleEliminarUsuario(usuario)}
                                                    className="rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white hover:bg-red-800"
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Tarjetas para móviles */}
                    <div className="flex flex-col gap-4 md:hidden">
                        {usuarios.map(usuario => (
                            <article
                                key={usuario.id}
                                className="rounded-xl border border-amber-900/20 bg-amber-50 p-4 shadow-sm"
                            >
                                <div className="mb-3 flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold text-amber-950">
                                            {nombreCompleto(usuario)}
                                        </h3>

                                        <p className="text-sm text-amber-800">
                                            @{usuario.userName}
                                        </p>
                                    </div>

                                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${colorRol(usuario.rol)}`}>
                                        {usuario.rol}
                                    </span>
                                </div>

                                <div className="space-y-1 text-sm text-amber-900">
                                    <p>
                                        <strong>Correo:</strong>{" "}
                                        {usuario.mail || "No informado"}
                                    </p>

                                    <p>
                                        <strong>Teléfono:</strong>{" "}
                                        {usuario.telefono || "No informado"}
                                    </p>
                                </div>

                                {usuario.id !== usuarioActual?.id && (
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => handleEliminarUsuario(usuario)}
                                            className="rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white hover:bg-red-800"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default UsuariosAdmin;