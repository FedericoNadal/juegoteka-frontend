import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../../hooks/useAuth";

interface HeaderProps {
    onLoginClick: () => void;
}


function Header({ onLoginClick }: HeaderProps) {
    const { usuario } = useAuth();

    return (
        <header className="border-b border-amber-800/20 bg-amber-50">

            <div className="max-w-6xl mx-auto px-6 h-15 flex items-center justify-between">

                <Link
                    to="/"
                    className="font-title text-2xl text-amber-900 font-semibold"
                >
                    Juegotekas
                </Link>


                <Button size="sm"
                    onClick={onLoginClick}
                >
                    {usuario
                        ? usuario.nombre
                        : "Ingresar"}
                </Button>


            </div>

        </header>
    );
}

export default Header;