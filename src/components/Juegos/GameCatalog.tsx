import { useEffect, useState } from "react";

import GameCard from "../ui/GameCard";

import type { Juego } from "../../types/juego";

import {
    obtenerJuegos,
    agregarAMisJuegos
} from "../../services/juegoService";

import { useAuth } from "../../hooks/useAuth";


function GameCatalog() {

    const { token, isAuthenticated } = useAuth();

    const [juegos, setJuegos] =
        useState<Juego[]>([]);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);


    useEffect(() => {

        async function cargarJuegos() {

            try {

                const datos =
                    await obtenerJuegos();

                setJuegos(datos);

            } catch (error) {

                console.error(
                    "Error al cargar juegos:",
                    error
                );

                setError(
                    "No se pudo cargar el catálogo."
                );

            } finally {

                setIsLoading(false);

            }
        }

        cargarJuegos();

    }, []);


 async function handleAgregar(
    idJuego: string
) {

    if (!token) {
        return;
    }

    try {

        await agregarAMisJuegos(
            token,
            idJuego
        );

        alert("Juego agregado a Mis Juegos");

    } catch (error) {

        console.error(
            "Error al agregar juego:",
            error
        );

        alert(
            "No se pudo agregar el juego"
        );

    }
}


    if (isLoading) {
        return <p>Cargando juegos...</p>;
    }


    if (error) {
        return (
            <p className="text-red-700">
                {error}
            </p>
        );
    }


    return (

        <div
            className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                gap-4
            "
        >

            {juegos.map((juego) => (

                <div key={juego._id}>

                    <GameCard
                        titulo={juego.titulo}
                        imagen={juego.imagen}
                        jugadores={
                            `${juego.cantJugadoresMin}-${juego.cantJugadoresMax}`
                        }
                        duracion={
                            `${juego.tiempoEstimado} min`
                        }
                    />

                    {isAuthenticated && (

                        <button
                            onClick={() =>
                                handleAgregar(juego._id)
                            }
                            className="
                                w-full
                                mt-2
                                px-3
                                py-2
                                text-sm
                                bg-amber-800
                                text-amber-50
                                rounded
                                hover:bg-amber-900
                            "
                        >
                            + Mis juegos
                        </button>

                    )}

                </div>

            ))}

        </div>

    );
}

export default GameCatalog;