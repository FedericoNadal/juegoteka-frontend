interface DeckProps {
    onDraw: () => void;
    cantidad: number;
}

/**
 * Deck
 *
 * Cabecera del mazo. Mismo formato que los desplegables de Estudio
 * (ver MapPanel) y muestra cuántas cartas hay disponibles.
 *
 * No conoce los mensajes ni administra su estado: al hacer click
 * solicita a MazoPanel que extraiga la siguiente carta.
 */
function Deck({ onDraw, cantidad }: DeckProps) {
    const hayCartas = cantidad > 0;

    return (
        <section
            className="
                rounded-xl
                bg-amber-50
                shadow
                overflow-hidden
            "
        >
            <button
                type="button"
                onClick={onDraw}
                disabled={!hayCartas}
                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    p-5
                    text-left
                    font-title
                    text-xl
                    transition-colors
                    hover:bg-amber-100/50
                    disabled:cursor-default
                    disabled:opacity-60
                    disabled:hover:bg-transparent
                "
            >
                <span>Robar una carta</span>

                <span className="rounded-full bg-amber-900 px-3 py-1 font-sans text-sm text-amber-50">
                    {cantidad} {cantidad === 1 ? "carta" : "cartas"}
                </span>
            </button>
        </section>
    );
}

export default Deck;