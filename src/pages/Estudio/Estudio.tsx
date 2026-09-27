import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Container from "../../components/ui/Container";


import StatisticsPanel from "../../components/Perfil/StatsPanel";
import MyGamesPanel from "../../components/Perfil/MyGamesPanel";
import MyJornadasPanel from "../../components/Perfil/MyJornadasPanel";
import MessageEditor from "../../components/Perfil/MessageEditor";
import JornadaOffCanvas from "../../components/Mapa/JornadaOffCanvas";
import JornadaForm from "../../components/Perfil/JornadaForm";
import MapPanel from "../../components/Perfil/MapPanel";

import { useAuth } from "../../hooks/useAuth";
import { obtenerMisJuegos } from "../../services/usuarioService";
import {
    obtenerJornadas,
    obtenerMisJornadas
} from "../../services/jornadaService";

import type { JuegosUsuario } from "../../types/usuario";
import type { Jornada } from "../../types/jornada";

function Estudio() {

    // NUEVO: isAuthenticated y cargandoSesion, para el guard de abajo
    const { usuario, token, isAuthenticated, cargandoSesion } = useAuth();

    const [juegos, setJuegos] =
        useState<JuegosUsuario[]>([]);

    const [jornadas, setJornadas] =
        useState<Jornada[]>([]);


        // @ts-expect-error -- pendiente de uso: distinguir jornadas propias vs.
// inscriptas en MyJornadasPanel (ver backlog "revisar coherencia flujo
// Jornada → Encuentro"). Se mantiene cargado para no repetir el fetch
// cuando se implemente.
    const [jornadasInscripto, setJornadasInscripto] =
        useState<Jornada[]>([]);

    const [jornadaSeleccionada, setJornadaSeleccionada] =
        useState<Jornada | null>(null);

    const location = useLocation();
    const navigate = useNavigate(); // NUEVO

    const destinatarioIdInicial =
        location.state?.destinatarioId;

    const [mostrarNuevaJornada, setMostrarNuevaJornada] =
    useState(false);

    // NUEVO: guard de sesión. Corre antes que cargarDatos en cada render,
    // pero como es un hook más, no altera el orden de los ya existentes.
    useEffect(() => {
        if (!cargandoSesion && !isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [cargandoSesion, isAuthenticated, navigate]);

    useEffect(() => {

        async function cargarDatos() {

            if (!token) {
                return;
            }

            try {

                const juegosUsuario =
                    await obtenerMisJuegos(token);

                setJuegos(juegosUsuario);


                const jornadasDisponibles =
                    await obtenerJornadas();

                setJornadas(jornadasDisponibles);


                const jornadasUsuario =
                    await obtenerMisJornadas(token);

                setJornadasInscripto(jornadasUsuario);


            } catch (error) {

                console.error(
                    "No se pudieron cargar los datos del estudio:",
                    error
                );

            }
        }

        cargarDatos();

    }, [token]);


    // MODIFICADO: antes era "if (!usuario) return null" (mudo).
    // Ahora cubre también el estado de carga y dispara el redirect de arriba.
    if (cargandoSesion || !isAuthenticated || !usuario) {
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

                    {/*
                    <div className="flex justify-center">

                        <PlayerCard
                            usuario={usuario}
                        />

                    </div>
                    */}


                    <MessageEditor
                        destinatarioIdInicial={
                            destinatarioIdInicial
                        }
                    />

<MapPanel />

                 <MyJornadasPanel
                      jornadas={jornadas}
                        usuario={usuario}
                    onSeleccionarJornada={setJornadaSeleccionada}
                    onNuevaJornada={() => setMostrarNuevaJornada(true)}
                    />


                    <MyGamesPanel
                        juegos={juegos}
                    />


                    <StatisticsPanel />

                </section>


                <JornadaOffCanvas
                    jornada={jornadaSeleccionada}
                    onClose={() =>
                        setJornadaSeleccionada(null)
                    }
                    onJornadaActualizada={(jornadaActualizada) => {
                        

                        /*
                         * Actualizamos la jornada abierta.
                         */
                        setJornadaSeleccionada(
                            jornadaActualizada
                        );

                        /*
                         * Actualizamos la jornada dentro
                         * del listado general.
                         */
                        setJornadas((jornadasActuales) =>
                            jornadasActuales.map((jornada) =>
                                jornada._id ===
                                jornadaActualizada._id
                                    ? jornadaActualizada
                                    : jornada
                            )
                        );

                    }}

                    
                />
                {mostrarNuevaJornada && (
    <JornadaForm
    onClose={() => setMostrarNuevaJornada(false)}
    onCreada={(jornada) => {
        setJornadas((actuales) => [
            ...actuales,
            jornada
        ]);
    }}
/>
)}

            </Container>

        </main>
    );
}

export default Estudio;