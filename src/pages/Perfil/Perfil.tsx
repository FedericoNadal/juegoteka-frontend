import Container from "../../components/ui/Container";

import PlayerCard from "../../components/Perfil/PlayerCard";
import StatisticsPanel from "../../components/Perfil/StatsPanel";
import MyGamesPanel from "../../components/Perfil/MyGamesPanel";

/**
 * Perfil
 *
 * Página principal del perfil del usuario.
 *
 * Presenta:
 * - identidad del jugador
 * - estadísticas
 * - colección de juegos
 */
function Perfil() {

    return (

        <main>

            <Container>

                <section
                    className="
                        flex
                        flex-col
                        gap-6
                        py-6
                        justify-center
                    "
                >

                    <div className="flex justify-center">
                        <PlayerCard />
                    </div>

                    <StatisticsPanel />

                    <MyGamesPanel />

                </section>

            </Container>

        </main>

    );

}

export default Perfil;