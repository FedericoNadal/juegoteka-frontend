import { Link } from "react-router-dom";

interface AuthMenuProps {
    userName: string;
    onLogout: () => void;
    onClose: () => void;
}

export default function AuthMenu({
    userName,
    onLogout,
    onClose
}: AuthMenuProps) {

    function handleLogout() {
        onLogout();
        onClose();
    }

    return (
        <div className="flex-1 px-6 py-8">

            <div className="mb-8">

                <p className="text-sm text-amber-800">
                    Sesión iniciada como
                </p>

                <h2 className="font-title text-2xl text-amber-950">
                    {userName}
                </h2>

            </div>


            <nav className="flex flex-col gap-3">

                <Link
                    to="/perfil"
                    onClick={onClose}
                    className="
                        rounded-lg
                        border border-amber-900/20
                        bg-amber-100
                        px-4 py-3
                        text-amber-950
                        hover:bg-amber-200
                        transition
                    "
                >
                    Mi perfil
                </Link>


                <Link
                    to="/mazo"
                    onClick={onClose}
                    className="
                        rounded-lg
                        border border-amber-900/20
                        bg-amber-100
                        px-4 py-3
                        text-amber-950
                        hover:bg-amber-200
                        transition
                    "
                >
                    Mi mazo
                </Link>


                <Link
                    to="/libreta"
                    onClick={onClose}
                    className="
                        rounded-lg
                        border border-amber-900/20
                        bg-amber-100
                        px-4 py-3
                        text-amber-950
                        hover:bg-amber-200
                        transition
                    "
                >
                    Mi libreta
                </Link>

            </nav>


            <div className="mt-8 border-t border-amber-900/20 pt-6">

                <button
                    type="button"
                    onClick={handleLogout}
                    className="
                        w-full
                        rounded-lg
                        px-4 py-3
                        text-left
                        text-red-800
                        hover:bg-red-100
                        transition
                    "
                >
                    Cerrar sesión
                </button>

            </div>

        </div>
    );
}