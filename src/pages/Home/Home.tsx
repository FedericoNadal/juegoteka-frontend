
import Hero from "../../components/Hero/Hero";
import Panel from "../../components/ui/Panel";
import SectionTitle from "../../components/ui/SectionTitle";
import GameCatalog from "../../components/Juegos/GameCatalog";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../../components/ui/Button";


function Home() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { abrirAuth } = useOutletContext<{
        abrirAuth: () => void;
    }>();

    return (

        <main>

            <Hero
                isAuthenticated={isAuthenticated}
                onLoginClick={abrirAuth}
            />

            <Panel>

                <SectionTitle>
                    ¿Qué es Juegotekas?
                </SectionTitle>

                <p>
                    Juegotekas es una plataforma orientada a facilitar el encuentro entre personas
                    a través de los juegos de mesa. Permite explorar juegos, organizar encuentros y
                    construir una comunidad alrededor de la cultura lúdica.

                    Nace como el proyecto de cierre de la materia PROGRAMACION III de la tecnicatura en INFORMATICA APLICADA del INSPT
                    y hace uso de una API desarrollada en equipo durante la cursada
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
                         Volver a mi estudio
                    </Button>
                </div>
            )}
        </main>

    );
}

export default Home;