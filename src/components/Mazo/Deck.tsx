interface DeckProps {
    onDraw: () => void;
}

/**
 * Deck
 *
 * Representa la pila de cartas.
 *
 * No conoce los mensajes ni administra su estado.
 * Al hacer click solicita a Mazo que extraiga la siguiente carta.
 */
function Deck({ onDraw }: DeckProps) {
    return (
        <section
            className="
                flex
                flex-col
                items-center
                gap-8
            "
        >
            <button
                type="button"
                onClick={onDraw}
                className="
                    w-20
                    h-28
                    rounded-xl
                    border-2
                    border-amber-900
                    bg-amber-900
                    text-white
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                "
            >
                MAZO
            </button>
        </section>
    );
}

export default Deck;