import { Link } from "react-router-dom";
import Button from "./Button";

function Header() {
    return (
        <header className="border-b border-amber-800/20 bg-amber-50">

            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link
                    to="/"
                    className="font-title text-2xl text-amber-900 font-semibold"
                >
                    Juegoteka
                </Link>

                <Link to="/login">
                    <Button size="sm">
                        Ingresar
                    </Button>
                </Link>

            </div>

        </header>
    );
}

export default Header;