import Hero from "../../components/Hero/Hero";
import Panel from "../../components/ui/Panel";
import SectionTitle from "../../components/ui/SectionTitle";

import GameCatalog from "../../components/Juegos/GameCatalog";

function Home() {

    return (

        <main>

            <Hero />

            <Panel>

                <SectionTitle>
                    ¿Qué es Juegoteka?
                </SectionTitle>

                <p>
                    Juegoteka es una plataforma orientada
                    a facilitar el encuentro entre personas
                    a través de los juegos de mesa. Permite
                    explorar juegos, organizar encuentros y
                    construir una comunidad alrededor de la
                    cultura lúdica.
                </p>

            </Panel>


            <Panel>

                <SectionTitle>
                    Juegos
                </SectionTitle>

                <GameCatalog />

            </Panel>

        </main>

    );
}

export default Home;