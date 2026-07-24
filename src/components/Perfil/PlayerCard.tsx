import Card from "../ui/Card";

/**
 * PlayerCard
 *
 * Representa la carta de identidad del jugador.
 *
 * Sigue la estética de las cartas de juego:
 * - encabezado con identidad
 * - imagen principal
 * - texto narrativo
 * - atributos resumidos
 *
 * Más adelante recibirá sus datos mediante props o API.
 */

function PlayerCard() {

    return (

        <Card
            className="
                w-80
                bg-stone-100
                p-5
            "
        >
            {/* Imagen principal */}
            <div
                className="
                    h-40
                    rounded-lg
                    bg-stone-300
                    mb-4
                "
            />

            {/* Encabezado */}
            <div className="mb-4">

                <p className="text-sm uppercase text-amber-700">
                    Jugador
                </p>

                <h2
                    className="
                        font-title
                        text-2xl
                        text-amber-900
                    "
                >
                    Jaime Fulanito
                </h2>

            </div>




            {/* Lore */}
            <div
                className="
                    border-t
                    border-amber-800/20
                    pt-4
                    mb-4
                "
            >

                <p
                    className="
                        text-sm
                        italic
                        leading-relaxed
                    "
                >
                    Siempre llevo Brass a las juntadas.

                    Prefiero juegos de estrategia antes que party games.
                </p>

            </div>


            {/* Atributos del jugador */}
            <div
                className="
                    border-t
                    border-amber-800/20
                    pt-3
                    grid
                    grid-cols-2
                    gap-y-2
                    text-xs
                    uppercase
                    text-amber-700
                "
            >

                <span>
                    🎲 42 partidas
                </span>

                <span className="text-right">
                    🤝 6 encuentros
                </span>

                <span>
                    📚 18 juegos
                </span>

                <span className="text-right">
                    ⭐ 3 años
                </span>

            </div>


        </Card>

    );

}

export default PlayerCard;