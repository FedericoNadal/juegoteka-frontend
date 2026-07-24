import { useState } from "react";
import ContactCard from "./ContactCard";

/**
 * Lista lateral de contactos.
 *
 * En esta primera versión utiliza
 * información simulada.
 */




function ContactList() {

    const [open, setOpen] = useState(false);

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

            <button onClick={() => setOpen(!open)}>
                Contactos
               
            </button>


            <div
                className={`
        ${open ? "block" : "hidden"}
        md:block
        space-y-3
    `}
            >

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