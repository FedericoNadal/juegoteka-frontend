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
            // Manejamos id si remitente viene populado como un objeto o si es una cadena directa
            const idRemitente = typeof mensaje.remitente === "object" 
                ? (mensaje.remitente as any)._id || (mensaje.remitente as any).id 
                : mensaje.remitente;
                
            if (idRemitente) {
                onResponder(idRemitente);
            }
            return;
        }

        // Tipo no contemplado todavía (ej: futuro "jornada").
        console.warn(`Tipo de mensaje sin acción definida: ${mensaje.tipo}`);
    }

    // Resolvemos la imagen con jerarquía de prioridades:
    // 1. URL explícita adjunta al mensaje
    // 2. Foto o avatar del remitente (si viene populado desde el backend)
    // 3. Placeholder estético por defecto
    const fotoRemitente = typeof mensaje.remitente === "object" 
        ? ((mensaje.remitente as any).fotoUrl || (mensaje.remitente as any).avatar) 
        : null;

    const imagenCarta = 
        mensaje.imagen?.trim() || 
        fotoRemitente || 
        "https://placehold.co/400x200/d97706/fff?text=Juegoteka";

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
                flex
                flex-col
                justify-between
            "
        >
            <div>
                {/* Ilustración o foto superior de la carta */}
                <div className="h-40 w-full rounded-lg bg-amber-100 mb-4 overflow-hidden border border-amber-900/20 shadow-inner">
                    <img 
                        src={imagenCarta} 
                        alt="Ilustración de la carta"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // En caso de URL rota o error de red, cae al placeholder de resguardo
                            (e.target as HTMLImageElement).src = "https://placehold.co/400x200/d97706/fff?text=Juegoteka";
                        }}
                    />
                </div>

                <p className="text-xs font-semibold uppercase text-amber-700 tracking-wider mb-1">
                    {mensaje.tipo}
                </p>

                <h2 className="font-title text-2xl mb-3 text-amber-950">
                    Carta
                </h2>

                <p className="mb-6 text-stone-800 leading-relaxed whitespace-pre-line text-sm">
                    {mensaje.contenido}
                </p>
            </div>

            <div className="flex gap-3 justify-between pt-3 border-t border-amber-200/80">
                <Button onClick={manejarAccionPrincipal}>
                    {"\u{270D}"}
                </Button>

                <Button onClick={() => onDelete(mensaje._id)}>
                    {"\u{1F5D1}"}
                </Button>
            </div>
        </article>
    );
}

export default MessageCard;