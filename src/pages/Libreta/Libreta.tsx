import Container from "../../components/ui/Container";
//import PageTitle from "../../components/ui/PageTitle";

import SearchBar from "../../components/Libreta/SearchBar";
import ContactList from "../../components/Libreta/ContactList";
import MessageEditor from "../../components/Libreta/MEssageEditor";

/**
 * Página Libreta
 *
 * Espacio destinado a la comunicación entre usuarios.
 *
 * Desde aquí podrán enviarse mensajes o desafíos.
 *
 * En esta primera versión la información es estática;
 * posteriormente se conectará con la API de usuarios
 * y mensajes.
 */
function Libreta() {

    return (

        <main>

            <Container>

               
                {/* Buscador de jugadores */}
                <SearchBar />

                {/* En escritorio se muestran ambas columnas.
                    En móviles se apilan automáticamente. */}

                <section
                    className="
                        mt-6
                        grid
                        gap-6
                        md:grid-cols-[260px_1fr]
                    "
                >

                    <ContactList />

                    <MessageEditor />

                </section>

            </Container>

        </main>

    );

}

export default Libreta;