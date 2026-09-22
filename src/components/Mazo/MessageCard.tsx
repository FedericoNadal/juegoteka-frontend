import Button from "../ui/Button";
import type { Mensaje } from "../../types/mensaje";

interface MessageCardProps {
    mensaje: Mensaje;
    onDelete: (idMensaje: string) => void;
    onConfirm: (idEncuentro: string) => void;
    onResponder: (idRemitente: string) => void;
}

function MessageCard({
    mensaje,
    onDelete,
    onConfirm,
    onResponder
}: MessageCardProps) {

    // Un desafío confirmable trae "referencia" (el id del encuentro).
    // Las notificaciones de cancelación usan el mismo tipo pero no la traen.
    const esDesafioConfirmable =
        mensaje.tipo === "notificacionEncuentro" && !!mensaje.referencia;

   function manejarAccionPrincipal() {
    if (esDesafioConfirmable) {
        onConfirm(mensaje.referencia!);
        return;
    }

    if (mensaje.tipo === "general") {
        onResponder(mensaje.remitente);
        return;
    }

    // Tipo no contemplado todavía (ej: futuro "jornada").
    // No se asume ninguna acción hasta que se decida el flujo.
    console.warn(`Tipo de mensaje sin acción definida: ${mensaje.tipo}`);
}

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
            <div
                className="
                    h-40
                    rounded-lg
                    bg-stone-300
                    mb-4
                "
            />

            <p className="text-sm uppercase text-amber-700">
                {mensaje.tipo}
            </p>

            <h2
                className="
                    font-title
                    text-2xl
                    mb-3
                "
            >
                Mensaje
            </h2>

            <p className="mb-6">
                {mensaje.contenido}
            </p>

            <div
                className="
                    flex
                    gap-3
                    justify-between
                "
            >
                <Button onClick={manejarAccionPrincipal}>
                    {"\u{270D}"}
                </Button>

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