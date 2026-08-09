import { useEffect, useState } from "react";

import Container from "../../components/ui/Container";

import PlayerCard from "../../components/Perfil/PlayerCard";
import StatisticsPanel from "../../components/Perfil/StatsPanel";
import MyGamesPanel from "../../components/Perfil/MyGamesPanel";

import { useAuth } from "../../hooks/useAuth";
import { obtenerMisJuegos } from "../../services/usuarioService";

import type { JuegosUsuario } from "../../types/usuario";

function Perfil() {

    const { usuario, token } = useAuth();

    const [juegos, setJuegos] =
        useState<JuegosUsuario[]>([]);


    useEffect(() => {

        async function cargarJuegos() {

            if (!token) {
                return;
            }

            try {

                const juegosUsuario =
                    await obtenerMisJuegos(token);

                setJuegos(juegosUsuario);

            } catch (error) {

                console.error(
                    "No se pudieron cargar los juegos:",
                    error
                );

            }
        }

        cargarJuegos();

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