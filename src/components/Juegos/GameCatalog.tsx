
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameCard from "../ui/GameCard";
import type { Juego } from "../../types/juego";
import {obtenerJuegos, agregarAMisJuegos} from "../../services/juegoService";
import { obtenerMisJuegos } from "../../services/usuarioService";
import { useAuth } from "../../hooks/useAuth";


function GameCatalog() {

    const { token, isAuthenticated } = useAuth();

    const [juegos, setJuegos] = useState<Juego[]>([]);

    const [misJuegosIds, setMisJuegosIds] = useState<string[]>([]);

    const [busqueda, setBusqueda] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {

        async function cargarJuegos() {

            try {

                setIsLoading(true);
                setError(null);

                const datos = await obtenerJuegos();

                let idsMisJuegos: string[] = [];

                if (isAuthenticated && token) {

                    const misJuegos = await obtenerMisJuegos(token);

                    idsMisJuegos = misJuegos.map(
                        (juego) => juego.id
                    );

                }

                // Mezclamos el catálogo una sola vez.
                // Algoritmo Fisher-Yates,
                // evita repeticiones por que cada intercambio modifica el array inmediatamente. No estamos copiando un elemento a otra posición: estamos intercambiando dos elementos.

                const mezclados = [...datos];

                for (let i = mezclados.length - 1; i > 0; i--) {

                    const j = Math.floor(Math.random() * (i + 1));

                    [mezclados[i], mezclados[j]] =
                        [mezclados[j], mezclados[i]];

                }

                setJuegos(mezclados);
                setMisJuegosIds(idsMisJuegos);

            } catch (error) {

                console.error("Error al cargar juegos:", error);

                setError("No se pudo cargar el catálogo.");

            } finally {

                setIsLoading(false);

            }
        }

        cargarJuegos();

    }, [token, isAuthenticated]);


    async function handleAgregar(idJuego: string) {

        if (!token) {
            return;
        }

        try {

            await agregarAMisJuegos(token, idJuego);

            // El servidor confirmó el alta.
            // Excluimos el juego del catálogo.
            setMisJuegosIds((idsActuales) => [
                ...idsActuales,
                idJuego
            ]);

            alert("Juego agregado a Mis Juegos");

        } catch (error) {

            console.error("Error al agregar juego:", error);

            alert("No se pudo agregar el juego");

        }
    }


    const juegosFiltrados = juegos.filter((juego) => {

        const yaLoTengo = misJuegosIds.includes(juego._id);

        const coincideBusqueda = juego.titulo
            .toLowerCase()
            .includes(busqueda.trim().toLowerCase());

        return !yaLoTengo && coincideBusqueda;

    });


    if (isLoading) {
        return <p>Cargando juegos...</p>;
    }


    if (error) {
        return <p className="text-red-700">{error}</p>;
    }


    return (
        <div>

            <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar un juego por título..."
                aria-label="Buscar juegos por título"
                className="
                    w-full mb-5 p-3
                    border border-amber-800
                    rounded-lg bg-amber-50
                "
            />

            {juegosFiltrados.length === 0 ? (

                <p className="text-stone-700">
                    No se encontraron juegos.
                </p>

            ) : (

                <div
                    className="
                        flex gap-4
                        overflow-x-auto
                        snap-x snap-mandatory
                        pb-4
                        md:grid
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        md:overflow-visible
                    "
                >
                    {juegosFiltrados.map((juego) => (

                        <div
                            key={juego._id}
                            className="w-48 shrink-0 snap-start md:w-auto"
                        >

                            <GameCard
                                titulo={juego.titulo}
                                imagen={juego.imagen}
                                jugadores={`${juego.cantJugadoresMin}-${juego.cantJugadoresMax}`}
                                duracion={`${juego.tiempoEstimado} min`}
                            />
                            <button
                                type="button"
                                onClick={() => navigate(`/juegos/${juego._id}`)}
                                className="
                                 w-full mt-2 px-3 py-2
                                 text-sm border border-amber-800
                                 text-amber-900 rounded
                                 hover:bg-amber-100
                                 "
                            >
                                REGLAMENTO
                            </button>
                            {isAuthenticated && (
                                <button
                                    type="button"
                                    onClick={() => handleAgregar(juego._id)}
                                    className="
                                        w-full mt-2 px-3 py-2
                                        text-sm bg-amber-800
                                        text-amber-50 rounded
                                        hover:bg-amber-900
                                    "
                                >
                                    APRENDER
                                </button>
                            )}

                        </div>

                    ))}
                </div>

            )}

        </div>
    );

}

export default GameCatalog;