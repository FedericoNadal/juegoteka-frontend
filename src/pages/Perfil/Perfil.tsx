import { useEffect, useState } from "react";

import Container from "../../components/ui/Container";

import PlayerCard from "../../components/Perfil/PlayerCard";
import StatisticsPanel from "../../components/Perfil/StatsPanel";
import MyGamesPanel from "../../components/Perfil/MyGamesPanel";
import MyJornadasPanel from "../../components/Perfil/MyJornadasPanel";

import { useAuth } from "../../hooks/useAuth";
import { obtenerMisJuegos } from "../../services/usuarioService";
import { obtenerMisJornadas} from "../../services/jornadaService";

import type { JuegosUsuario } from "../../types/usuario";
import type { Jornada } from "../../types/jornada";

function Perfil() {

    const { usuario, token } = useAuth();

    const [juegos, setJuegos] =
        useState<JuegosUsuario[]>([]);

    const [jornadas, setJornadas] =
        useState<Jornada[]>([]);

  

   useEffect(() => {

    async function cargarDatos() {

        if (!token) {
            return;
        }

        try {

            const juegosUsuario =
                await obtenerMisJuegos(token);

            setJuegos(juegosUsuario);


            const jornadasUsuario =
                await obtenerMisJornadas(token);

            setJornadas(jornadasUsuario);


        } catch (error) {

            console.error(
                "No se pudieron cargar los datos del perfil:",
                error
            );

        }
    }

    cargarDatos();

}, [token]);


    // Mientras se restaura la sesión
    if (!usuario) {
        return null;
    }


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

                        <PlayerCard
                            usuario={usuario}
                        />

                    </div>
                    <MyJornadasPanel jornadas={jornadas} />
                    <StatisticsPanel />

                    <MyGamesPanel
                        juegos={juegos}
                    />

                </section>

            </Container>

        </main>
    );
}

export default Perfil;