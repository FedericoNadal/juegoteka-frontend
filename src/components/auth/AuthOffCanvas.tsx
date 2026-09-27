import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import PlayerCard from "../Perfil/PlayerCard";

import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

import Button from "../ui/Button";

import {
    register
} from "../../services/authService";

import type {
    RegisterData
} from "../../types/auth";

import EditProfileForm from "../Perfil/EditProfileForm";

import {
    updateUsuario
} from "../../services/usuarioService";


import type {
    UpdateUsuarioData
} from "../../types/usuario";


interface AuthOffcanvasProps {
    isOpen: boolean;
    isLoading?: boolean;
    error?: string | null;

    onClose: () => void;

    onLogin: (credentials: {
        userName: string;
        pass: string;
    }) => Promise<void>;

  }

export default function AuthOffcanvas({
    isOpen,
    isLoading = false,
    error = null,
    onClose,
    onLogin,
    }: AuthOffcanvasProps) {

  const {
    usuario,
    token,
    isAuthenticated,
    actualizarUsuario,
    logout
} = useAuth();

    const [view, setView] =
    useState<"login" | "register">("login");

const [registerLoading, setRegisterLoading] =
    useState(false);

const [registerError, setRegisterError] =
    useState<string | null>(null);

const [editingProfile, setEditingProfile] =
    useState(false);

const [profileLoading, setProfileLoading] =
    useState(false);

const [profileError, setProfileError] =
    useState<string | null>(null);

async function handleRegister(
    data: RegisterData
) {

    setRegisterLoading(true);
    setRegisterError(null);

    try {

        await register(data);

        // El registro fue exitoso.
        // Volvemos al login para que
        // el usuario ingrese normalmente.
        setView("login");

    } catch (error) {

        console.error(
            "Error al registrar usuario:",
            error
        );

        setRegisterError(
            error instanceof Error
                ? error.message
                : "No se pudo crear la cuenta."
        );

    } finally {

        setRegisterLoading(false);
    }
}

async function handleUpdateProfile(
    data: UpdateUsuarioData
) {

    if (!token) {
        return;
    }

    setProfileLoading(true);
    setProfileError(null);

    try {

        const usuarioActualizado =
            await updateUsuario(data, token);

        actualizarUsuario(usuarioActualizado);

        setEditingProfile(false);

    } catch (error) {

        console.error(
            "Error al actualizar perfil:",
            error
        );

        setProfileError(
            error instanceof Error
                ? error.message
                : "No se pudo actualizar el perfil."
        );

    } finally {

        setProfileLoading(false);

    }
}


const handleDesinscribirseDeTorneo = async (idEncuentro: string) => {
    if (!token || !usuario) return;

    try {
        await cancelarInscripcionEncuentro(
            idEncuentro,
            token
        );

        const jornadaActualizada =
            await obtenerJornadaPorId(jornada._id);

        onJornadaActualizada(jornadaActualizada);
    } catch (error) {
        console.error(
            "Error al desinscribirse del torneo:",
            error
        );

        setError(
            error instanceof Error
                ? error.message
                : "No se pudo cancelar la inscripción"
        );
    }
};



    return (
        <>

            <div
                onClick={onClose}
                className={`
                    fixed inset-0 z-40
                    bg-stone-900/60
                    backdrop-blur-[1px]
                    transition-opacity duration-300

                    ${
                        isOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }
                `}
            />

            <aside
                className={`
                    fixed
                    top-0
                    right-0
                    z-50
                    h-full
                    w-[90%]
                    max-w-md
                    flex
                    flex-col

                    bg-amber-50
                    border-l-2
                    border-amber-900/30
                    shadow-2xl

                    transform
                    transition-transform
                    duration-300

                    ${
                        isOpen
                            ? "translate-x-0"
                            : "translate-x-full"
                    }
                `}
            >

                

                {isAuthenticated && usuario ? (

    <div className="
        flex
        flex-1
        flex-col
        items-center
        gap-6
        p-6
        overflow-y-auto
    ">

        {editingProfile ? (

            <div className="w-full">

                <h2 className="
                    mb-6
                    font-title
                    text-2xl
                    text-amber-900
                ">
                    Editar perfil
                </h2>

                <EditProfileForm
                    usuario={usuario}
                    onSave={handleUpdateProfile}
                    onCancel={() => {
                        setProfileError(null);
                        setEditingProfile(false);
                    }}
                    loading={profileLoading}
                    error={profileError}
                />

            </div>

        ) : (

            <>
                <PlayerCard
                    usuario={usuario}
                />

                <Button
                    onClick={() => {
                        setProfileError(null);
                        setEditingProfile(true);
                    }}
                >
                    Editar perfil
                </Button>

                <Button
                    onClick={() => {
                        logout();
                        onClose();
                    }}
                >
                    Cerrar sesión
                </Button>
            </>

        )}

    </div>


                ) : (
                <>
                   <AuthHeader
    onClose={() => {
        setView("login");
        onClose();
    }}
/>

{view === "login" ? (
    <>
        <LoginForm
            isLoading={isLoading}
            error={error}
            onLogin={onLogin}
        />

        <AuthFooter
            onRegister={() => {
                setRegisterError(null);
                setView("register");
            }}
        />
    </>
) : (
    <RegisterForm
        isLoading={registerLoading}
        error={registerError}
        onRegister={handleRegister}
    />
)}
                    </>

                )}

            </aside>

        </>
    );
}