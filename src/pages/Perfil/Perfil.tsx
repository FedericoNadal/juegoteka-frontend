import Container from "../../components/ui/Container";
import PageTitle from "../../components/ui/PageTitle";

import PlayerInfo from "../../components/Perfil/ProfileHeader";
import LorePanel from "../../components/Perfil/LorePanel";
import StatisticsPanel from "../../components/Perfil/StatsPanel";
import MyGamesPanel from "../../components/Perfil/MyGamesPanel";

/**
 * Perfil
 *
 * Página principal del perfil del usuario.
 *
 * Reúne la información personal, una breve descripción,
 * estadísticas de juego y la colección de juegos.
 *
 * Cada sección se implementa mediante un componente
 * independiente para facilitar su mantenimiento.
 */
function Perfil() {

    return (

        <main>

            <Container>

                <PageTitle>
                    Perfil
                </PageTitle>
                 <PlayerInfo />
                 <LorePanel />  
                 <StatisticsPanel />           
                <MyGamesPanel />
               
            </Container>

        </main>

    );

}

export default Perfil;