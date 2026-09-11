import Button from "../ui/Button";
import type { Mensaje } from "../../types/mensaje";

interface MessageCardProps {
    mensaje: Mensaje;
    onDelete: (idMensaje: string) => void;
}

function MessageCard({
    mensaje,
    onDelete
}: MessageCardProps) {
    return (
        <article
            className="
                w-80
                rounded-2xl
                bg-stone-100
                border-2
                border-amber-800
                p-5
                shadow-lg
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

            {/* Tipo de mensaje */}
            <p className="text-sm uppercase text-amber-700">
                {mensaje.tipo}
            </p>

            {/* Título temporal */}
            <h2
                className="
                    font-title
                    text-2xl
                    mb-3
                "
            >
                Mensaje
            </h2>

            {/* Contenido real del mensaje */}
            <p className="mb-6">
                {mensaje.contenido}
            </p>

            {/* Acciones */}
            <div
                className="
                    flex
                    gap-3
                    justify-between
                "
            >
                <Button>{"\u{270D}"}</Button>

                <Button
                    onClick={() => onDelete(mensaje._id)}
                >
                    {"\u{1F5D1}"}
                </Button>
            </div>
        </article>
    );
}

export default MessageCard;