import { useEffect, useState } from "react";

import GameCard from "../ui/GameCard";

import type { JuegosUsuario } from "../../types/usuario";

import {
    eliminarDeMisJuegos
} from "../../services/juegoService";

import { useAuth } from "../../hooks/useAuth";


interface MyGamesProps {

    juegos: JuegosUsuario[];

}


function MyGamesPanel({
    juegos
}: MyGamesProps) {

    const { token } = useAuth();


    // Estado local de los juegos mostrados.
    // Nos permite quitar una tarjeta sin recargar toda la página.
    const [misJuegos, setMisJuegos] =
        useState<JuegosUsuario[]>(juegos);


    // Si el componente padre recibe nuevos juegos,
    // actualizamos nuestra copia local.
    useEffect(() => {

        setMisJuegos(juegos);

    }, [juegos]);


    async function handleEliminar(
        idJuego: string
    ) {

        if (!token) {
            return;
        }

        try {

            await eliminarDeMisJuegos(
                token,
                idJuego
            );


            // El backend confirmó la eliminación.
            // Ahora quitamos la tarjeta del estado local.
            setMisJuegos((juegosActuales) =>
                juegosActuales.filter(
                    (juego) => juego.id !== idJuego
                )
            );


        } catch (error) {

            console.error(
                "Error al eliminar juego:",
                error
            );

            alert(
                "No se pudo eliminar el juego"
            );

        }

    }


    return (

        <section>

            <div
                className="
                    flex
                    gap-4
                    overflow-x-auto
                    pb-2
                "
            >

                {misJuegos.map((juego) => (

                    <GameCard

                        key={juego.id}

                        titulo={juego.titulo}

                        imagen={juego.imagen}

                        actionLabel="− Quitar"

                        onAction={() =>
                            handleEliminar(juego.id)
                        }

                    />

                ))}

            </div>

        </section>

    );

}


export default MyGamesPanel;
