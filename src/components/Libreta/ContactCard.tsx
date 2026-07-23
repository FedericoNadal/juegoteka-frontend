type Props = {

    nombre: string;

};

/**
 * Representa un contacto de la libreta.
 *
 * Más adelante mostrará fotografía,
 * estado y última conexión.
 */
function ContactCard({ nombre }: Props) {

    return (

        <button

            className="
                w-full
                rounded-lg
                border
                border-amber-300
                bg-white
                p-3
                text-left
                transition
                hover:bg-amber-100
            "

        >

            👤 {nombre}

        </button>

    );

}

export default ContactCard;