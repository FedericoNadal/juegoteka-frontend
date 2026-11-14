import Hero from "../../components/Hero/Hero";
import Panel from "../../components/ui/Panel";
import SectionTitle from "../../components/ui/SectionTitle";

import GameCatalog from "../../components/Juegos/GameCatalog";

import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

function Home() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (

        <main>

            <Hero />

            <Panel>

                <SectionTitle>
                    ¿Qué es Juegotekas?
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

                <div id="catalogo-juegos">
                    <GameCatalog />
                </div>

            </Panel>
            {isAuthenticated && (
                <div className="mt-6 flex justify-center">
                    <Button onClick={() => navigate("/estudio")}>
                        📚 Volver a mi estudio
                    </Button>
                </div>
            )}
        </main>

    );
}

export default Home;