import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import GameCard from "../ui/GameCard";

import type { JuegosUsuario } from "../../types/usuario";

import { eliminarDeMisJuegos } from "../../services/juegoService";

import { useAuth } from "../../hooks/useAuth";

interface MyGamesProps {
    juegos: JuegosUsuario[];
}

function MyGamesPanel({ juegos }: MyGamesProps) {

    const { token } = useAuth();
    const navigate = useNavigate();
    const [misJuegos, setMisJuegos] =
        useState<JuegosUsuario[]>(juegos);
    const [busqueda, setBusqueda] = useState("");


    const carruselRef = useRef<HTMLDivElement>(null);

    function moverIzquierda() {
        if (carruselRef.current) {
            carruselRef.current.scrollLeft -= 240;
        }
    }

    function moverDerecha() {
        if (carruselRef.current) {
            carruselRef.current.scrollLeft += 240;
        }
    }




    useEffect(() => {
        setMisJuegos(juegos);
    }, [juegos]);

    const juegosFiltrados = misJuegos.filter((juego) =>
        juego.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );
    function explorarJuegos() {
        navigate("/", { state: { scrollTo: "catalogo-juegos" } });
    }


    function verInfo(titulo: string) {

        const busqueda = encodeURIComponent(titulo);

        window.open(
            `https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=${busqueda}`,
            "_blank",
            "noopener,noreferrer"
        );

    }


    async function handleEliminar(idJuego: string) {

        if (!token) {
            return;
        }

        try {

            await eliminarDeMisJuegos(token, idJuego);

            setMisJuegos((juegosActuales) =>
                juegosActuales.filter(
                    (juego) => juego.id !== idJuego
                )
            );

        } catch (error) {

            console.error("Error al eliminar juego:", error);

            alert("No se pudo eliminar el juego");

        }

    }


    return (
        <section className=" rounded-xl bg-amber-10/50 shadow overflow-hidden">

            <div className="px-4 sm:px-5 pb-5 space-y-4">

                {misJuegos.length === 0 ? (

                    <p className="text-sm leading-relaxed text-stone-700">
                        Todavía no tenés juegos. Explorá el catálogo
                        y sumá los que quieras con el botón APRENDER.
                        Si sos una juegoteka, necesitás al menos uno
                        para poder crear jornadas.
                    </p>

                ) : (

                    <div>

                        {juegosFiltrados.length === 0 ? (

                            <p className="text-stone-700">
                                No se encontraron juegos.
                            </p>

                        ) : (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={moverIzquierda}
                                    aria-label="Anterior"
                                    className="hidden md:flex items-center justify-center absolute left-1 top-20 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-amber-50/90 hover:bg-amber-100 border border-amber-800/40 text-amber-900 font-bold shadow"
                                >
                                    ‹
                                </button>

                                <div
                                    ref={carruselRef}
                                    className="
                                            flex gap-4
                                            overflow-x-auto
                                            pb-3
                                            snap-x snap-mandatory
                                            scroll-smooth
                                        "
                                >
                                    {juegosFiltrados.map((juego) => (
                                        <div
                                            key={juego.id}
                                            className="w-56 shrink-0 snap-start"
                                        >
                                            <GameCard
                                                titulo={juego.titulo}
                                                imagen={juego.imagen}
                                                widthClass="w-full"
                                                imageHeightClass="h-40 sm:h-44"
                                            />

                                            <div className="flex flex-col gap-2 mt-2 sm:flex-row">
                                                <button
                                                    type="button"
                                                    onClick={() => verInfo(juego.titulo)}
                                                    className="
                                                    flex-1 px-2 py-2
                                                    text-sm rounded
                                                    border border-amber-800
                                                    text-amber-900
                                                    bg-amber-100
                                                    hover:bg-amber-200
                                                "
                                                >
                                                    + Info
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleEliminar(juego.id)}
                                                    className="
                                                    flex-1 px-2 py-2
                                                    text-sm rounded
                                                    bg-amber-800
                                                    text-amber-50
                                                    hover:bg-amber-900
                                                "
                                                >
                                                    # Soltar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={moverDerecha}
                                    aria-label="Siguiente"
                                    className="hidden md:flex items-center justify-center absolute right-1 top-20 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-amber-50/90 hover:bg-amber-100 border border-amber-800/40 text-amber-900 font-bold shadow"
                                >
                                    ›
                                </button>
                            </div>
                        )}
                        <input

                            type="search"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar un juego por título..."
                            aria-label="Buscar juegos por título"
                            className="
                                w-full mb-5 p-3
                                border border-amber-800
                                rounded-lg bg-amber-50/50
                            "
                        />
                    </div>
                )}

                <Button onClick={explorarJuegos}>
                    Explorar mas juegos
                </Button>
            </div>

        </section>


    );
}
export default MyGamesPanel;