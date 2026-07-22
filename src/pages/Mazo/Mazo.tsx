import Deck from "../../components/Mazo/Deck";
import PlayingCard from "../../components/Mazo/PlayingCard";
import Container from "../../components/ui/Container";

/**
 * Página principal del Mazo.
 *
 * Centraliza las notificaciones y acciones pendientes
 * del usuario utilizando la metáfora de un mazo de cartas.
 */
function Mazo() {
    return (

        <main>

            <Container>

                <section
                    className="
                        flex
                        flex-col
                        items-center
                        gap-8
                        py-8
                    "
                >

                    <PlayingCard />

                    <Deck />

                </section>

            </Container>

        </main>

    );
}

export default Mazo;