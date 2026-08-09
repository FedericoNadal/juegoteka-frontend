import Card from "../ui/Card";
import type { Usuario } from "../../types/usuario";

interface PlayerCardProps {
    usuario: Usuario;
}

/**
 * PlayerCard
 *
 * Representa la carta de identidad del jugador.
 *
 * Recibe los datos del usuario mediante props.
 * No conoce el backend ni maneja autenticación.
 */
function PlayerCard({ usuario }: PlayerCardProps) {

    return (
        <Card
            className="
                w-80
                bg-stone-100
                p-4
            "
        >

            {/* ==================================================
                FOTO
                Mantiene una proporción fija de 4:3.
                object-cover evita deformar la imagen.
               ================================================== */}
            <div
                className="
                    aspect-[4/3]
                    rounded-sm
                    bg-stone-300
                    overflow-hidden
                    mb-4
                "
            >
                {usuario.foto && (
                    <img
                        src={usuario.foto}
                        alt={`Foto de ${usuario.nombre}`}
                        className="
                            w-full
                            h-full
                            object-cover
                        "
                    />
                )}
            </div>


            {/* ==================================================
                ENCABEZADO
               ================================================== */}
            <div className="mb-1">

                <p className="
                    text-sm
                    uppercase
                    text-amber-700
                ">
                    {usuario.rol}
                </p>

                <h2
                    className="
                        font-title
                        text-2xl
                        text-amber-900
                    "
                >
                    {usuario.userName}
                </h2>

            </div>


            {/* ==================================================
                ABOUT ME
               ================================================== */}
            <div
                className="
                    border-t
                    border-amber-800/20
                    pt-1
                    mb-4
                "
            >

                <div
                    className="
                        h-30
                        
                        rounded-sm
                        p-2
                        overflow-hidden
                        text-sm
                        leading-5
                        text-stone-700
                    "
                >
                    {usuario.aboutMe}
                </div>

            </div>


            {/* ==================================================
                ESTADÍSTICAS

                Las dejamos comentadas por ahora mientras
                definimos las proporciones de la carta.
               ================================================== */}

            {/*
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
            */}

        </Card>
    );
}

export default PlayerCard;