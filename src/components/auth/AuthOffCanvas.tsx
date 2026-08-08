import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import LoginForm from "./LoginForm";
import AuthMenu from "./AuthMenu";

import { useAuth } from "../../hooks/useAuth";

interface AuthOffcanvasProps {
    isOpen: boolean;
    isLoading?: boolean;
    error?: string | null;

    onClose: () => void;

    onLogin: (credentials: {
        userName: string;
        pass: string;
    }) => Promise<void>;

    onRegister?: () => void;
}

export default function AuthOffcanvas({
    isOpen,
    isLoading = false,
    error = null,
    onClose,
    onLogin,
    onRegister,
}: AuthOffcanvasProps) {

    const {
        usuario,
        isAuthenticated,
        logout
    } = useAuth();


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

                <AuthHeader
                    onClose={onClose}
                />


                {isAuthenticated && usuario ? (

                    <AuthMenu
                        userName={usuario.nombre}
                        onLogout={logout}
                        onClose={onClose}
                    />

                ) : (

                    <>
                        <LoginForm
                            isLoading={isLoading}
                            error={error}
                            onLogin={onLogin}
                        />

                        <AuthFooter
                            onRegister={onRegister}
                        />
                    </>

                )}

            </aside>

        </>
    );
}