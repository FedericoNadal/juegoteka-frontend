
import Card from "../ui/Card";

type GameCardProps = {

    titulo: string;

    imagen?: string;

    // Son opcionales porque en "Mis juegos"
    // no necesitamos mostrar estos datos.
    jugadores?: string;

    duracion?: string;

    // Acción opcional.
    // La card no sabe qué hace: simplemente ejecuta la función.
    actionLabel?: string;

    onAction?: () => void;

};


/**
 * GameCard
 *
 * Representa un juego de mesa.
 *
 * Puede utilizarse tanto en:
 *
 * - catálogo de juegos
 * - colección "Mis juegos"
 *
 * No conoce el backend ni maneja autenticación.
 */
function GameCard({

    titulo,
    imagen,
    jugadores,
    duracion,
    actionLabel,
    onAction

}: GameCardProps) {

    return (

        <Card
            className="
                w-48
                flex
                flex-col
                gap-3
            "
        >

            {/* Imagen del juego */}

            <div
                className="
                    h-56
                    rounded-md
                    overflow-hidden
                    bg-stone-300
                    flex
                    items-center
                    justify-center
                "
            >

                {
                    imagen ?

                        <img
                            src={imagen}
                            alt={titulo}
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                        />

                        :

                        <span className="text-6xl">
                            🎲
                        </span>
                }

            </div>


            {/* Información principal */}

            <div>

                <h3
                    className="
                        font-title
                        text-lg
                        text-amber-900
                        truncate
                    "
                    title={titulo}
                >
                    {titulo}
                </h3>


                {/* Datos del juego.
                    Solo aparecen cuando fueron proporcionados. */}

                {
                    (jugadores || duracion) && (

                        <div
                            className="
                                flex
                                justify-between
                                mt-1
                                text-xs
                                text-stone-600
                            "
                        >

                            {
                                jugadores && (
                                    <span>
                                        👥 {jugadores}
                                    </span>
                                )
                            }

                            {
                                duracion && (
                                    <span>
                                        ⏳ {duracion}
                                    </span>
                                )
                            }

                        </div>

                    )
                }

            </div>


            {/* Acción opcional */}

            {
                actionLabel && onAction && (

                    <button
                        type="button"
                        onClick={onAction}
                        className="
                            w-full
                            mt-1
                            px-3
                            py-2
                            text-sm
                            rounded
                            bg-amber-800
                            text-amber-50
                            hover:bg-amber-900
                            transition
                        "
                    >
                        {actionLabel}
                    </button>

                )
            }

        </Card>

    );

}

export default GameCard;

