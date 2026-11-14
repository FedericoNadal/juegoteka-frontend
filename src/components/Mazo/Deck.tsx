
interface DeckProps {
    onDraw: () => void;
    cantidad: number;
}

function Deck({ onDraw, cantidad }: DeckProps) {
    const hayCartas = cantidad > 1;

    return (
        <section className="rounded-xl bg-amber-50 shadow overflow-hidden">
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

                    /* Estados normales y Hover */
                    transition-colors
                    duration-200
                    hover:bg-amber-100/50

                    /* EL PARPADEO: feedback táctil instantáneo al presionar */
                    active:bg-amber-200
                    active:duration-0

                    /* Deshabilitado */
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
