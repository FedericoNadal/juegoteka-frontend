import ContactCard from "./ContactCard";

/**
 * Lista lateral de contactos.
 *
 * En esta primera versión utiliza
 * información simulada.
 */
function ContactList() {

    const contactos = [

        "Ana",

        "Martín",

        "Pedro",

        "Lucía"

    ];

    return (

        <section
            className="
                rounded-xl
                bg-amber-50
                p-4
                shadow
            "
        >

            <h2
                className="
                    font-title
                    text-xl
                    mb-4
                "
            >
                Contactos
            </h2>

            <div className="space-y-3">

                {

                    contactos.map((nombre) => (

                        <ContactCard
                            key={nombre}
                            nombre={nombre}
                        />

                    ))

                }

            </div>

        </section>

    );

}

export default ContactList;