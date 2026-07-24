import GameCard from "../ui/GameCard";

/**
 * MyGames
 *
 * Vista resumida de la colección del usuario.
 *
 * Más adelante los datos provendrán del backend.
 */
function MyGames() {

    const juegos = [

        {
            titulo: "Catan",
            jugadores: "3-4",
            duracion: "90 min"
        },

        {
            titulo: "Carcassonne",
            jugadores: "2-5",
            duracion: "45 min"
        },

        {
            titulo: "Terraforming Mars",
            jugadores: "1-5",
            duracion: "120 min"
        }

    ];

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

                {

                    juegos.map((juego) => (

                        <GameCard

                            key={juego.titulo}

                            titulo={juego.titulo}

                            jugadores={juego.jugadores}

                            duracion={juego.duracion}

                        />

                    ))

                }

            </div>

        </section>

    );

}

export default MyGames;