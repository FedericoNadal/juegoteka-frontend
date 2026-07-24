import Card from "../ui/Card";

type GameCardProps = {

    titulo: string;

    imagen?: string;

    jugadores: string;

    duracion: string;

};

/**
 * GameCard
 *
 * Representa un juego de mesa dentro de la colección
 * del usuario.
 *
 * En esta primera maqueta utiliza una imagen de
 * reemplazo cuando todavía no existen recursos reales.
 */
function GameCard({

    titulo,
    imagen,
    jugadores,
    duracion

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
                            className="w-full h-full object-cover"

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
                    "
                >
                    {titulo}
                </h3>

                <p className="text-sm">

                    👥 {jugadores}

                </p>

                <p className="text-sm">

                    ⏳ {duracion}

                </p>

            </div>

        </Card>

    );

}

export default GameCard;