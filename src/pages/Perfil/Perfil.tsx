import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Container from "../../components/ui/Container";

import PlayerCard from "../../components/Perfil/PlayerCard";
import StatisticsPanel from "../../components/Perfil/StatsPanel";
import MyGamesPanel from "../../components/Perfil/MyGamesPanel";
import MyJornadasPanel from "../../components/Perfil/MyJornadasPanel";
import MessageEditor from "../../components/Perfil/MessageEditor";

import { useAuth } from "../../hooks/useAuth";
import { obtenerMisJuegos } from "../../services/usuarioService";
import { obtenerMisJornadas } from "../../services/jornadaService";

import type { JuegosUsuario } from "../../types/usuario";
import type { Jornada } from "../../types/jornada";

function Perfil() {

    const { usuario, token } = useAuth();

    const [juegos, setJuegos] =
        useState<JuegosUsuario[]>([]);

    const [jornadas, setJornadas] =
        useState<Jornada[]>([]);
    const location = useLocation();

    const destinatarioIdInicial =
        location.state?.destinatarioId;

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

                    <MessageEditor
                        destinatarioIdInicial={
                            destinatarioIdInicial
                        }
                    />


                    <MyJornadasPanel
                        jornadas={jornadas}
                    />

                    <MyGamesPanel
                        juegos={juegos}
                    />

                    <StatisticsPanel />



                </section>

            </Container>

        </main>
    );
}

export default Perfil;