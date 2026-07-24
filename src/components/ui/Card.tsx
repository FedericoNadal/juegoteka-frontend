type CardProps = {

    /** Contenido interno de la carta */
    children: React.ReactNode;

    /** Clases adicionales para personalizar tamaño o layout */
    className?: string;

};

/**
 * Card
 *
 * Componente base para todas las cartas de la aplicación.
 *
 * Su única responsabilidad es proporcionar una apariencia
 * coherente inspirada en una carta física.
 *
 * No conoce absolutamente nada del contenido que aloja.
 * Cualquier componente puede reutilizarla:
 *
 * - cartas de juegos
 * - cartas del mazo
 * - cartas de usuarios
 * - futuras cartas de estadísticas
 *
 */
function Card({ children, className = "" }: CardProps) {

    return (

        <article
            className={`
                rounded-xl
                border-2
                border-amber-800
                bg-amber-50
                shadow-md
                p-4
                ${className}
            `}
        >

            {children}

        </article>

    );

}

export default Card;