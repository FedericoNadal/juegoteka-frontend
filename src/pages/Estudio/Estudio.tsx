
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
//import StatisticsPanel from "../../components/Perfil/StatsPanel";
import MyGamesPanel from "../../components/Perfil/MyGamesPanel";
import MyJornadasPanel from "../../components/Perfil/MyJornadasPanel";
import MessageEditor from "../../components/Perfil/MessageEditor";
import JornadaOffCanvas from "../../components/Mapa/JornadaOffCanvas";
import JornadaForm from "../../components/Perfil/JornadaForm";
import MapPanel from "../../components/Perfil/MapPanel";
import MazoPanel from "../../components/Mazo/MazoPanel";
import { useAuth } from "../../hooks/useAuth";
import { obtenerMisJuegos } from "../../services/usuarioService";
import { obtenerJornadas, obtenerMisJornadas } from "../../services/jornadaService";
import Spinner from "../../components/ui/Spinner";

import type { JuegosUsuario } from "../../types/usuario";
import type { Jornada } from "../../types/jornada";

function Estudio() {


    const { usuario, token, isAuthenticated, cargandoSesion } = useAuth();

    const [juegos, setJuegos] =
        useState<JuegosUsuario[]>([]);

    const [jornadas, setJornadas] =
        useState<Jornada[]>([]);

    const [jornadasInscripto, setJornadasInscripto] =
        useState<Jornada[]>([]);

    const [jornadaSeleccionada, setJornadaSeleccionada] =
        useState<Jornada | null>(null);

    const [filtroJuegotekaId, setFiltroJuegotekaId] =
        useState<string | null>(null);

    const jornadasPanelRef = useRef<HTMLDivElement>(null);

    function handleVerJornadasDeJuegoteka(juegotekaId: string) {
        setFiltroJuegotekaId(juegotekaId);
        jornadasPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const location = useLocation();
    const navigate = useNavigate();

    const [destinatarioId, setDestinatarioId] =
        useState<string | undefined>(location.state?.destinatarioId);
    const editorRef = useRef<HTMLDivElement>(null);



    function responderMensaje(idRemitente: string) {
        setDestinatarioId(idRemitente);
        editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const [mostrarNuevaJornada, setMostrarNuevaJornada] =
        useState(false);

    //  guard de sesión. Corre antes que cargarDatos en cada render,
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



    if (cargandoSesion) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Spinner size="full" label="Cargando juegos..." />
            </div>
        );
    }

    if (!isAuthenticated || !usuario) {
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

                    <MapPanel onVerJornadas={handleVerJornadasDeJuegoteka} />

                    <div ref={jornadasPanelRef}>
                        <MyJornadasPanel
                            jornadas={jornadas}
                            usuario={usuario}
                            onSeleccionarJornada={setJornadaSeleccionada}
                            onNuevaJornada={() => setMostrarNuevaJornada(true)}
                            filtroJuegotekaId={filtroJuegotekaId}
                            onLimpiarFiltro={() => setFiltroJuegotekaId(null)}
                            forzarAbierto={filtroJuegotekaId !== null}
                            idsInscripto={jornadasInscripto.map((j) => j._id)}
                        />
                    </div>

                    <MazoPanel onResponder={responderMensaje} />

                    <div ref={editorRef}>
                        <MessageEditor
                            key={destinatarioId}
                            destinatarioIdInicial={destinatarioId}
                        />
                    </div>



                    <MyGamesPanel juegos={juegos} />




                    {/* <StatisticsPanel /> */}

                </section>


                <JornadaOffCanvas
                    jornada={jornadaSeleccionada}
                    onClose={() =>
                        setJornadaSeleccionada(null)
                    }
                    onJornadaActualizada={(jornadaActualizada) => {

                        // Actualiza la jornada abierta en el offcanvas.
                        setJornadaSeleccionada(jornadaActualizada);

                        // Actualiza la jornada en el listado general.
                        setJornadas((jornadasActuales) =>
                            jornadasActuales.map((jornada) =>
                                jornada._id === jornadaActualizada._id
                                    ? jornadaActualizada
                                    : jornada
                            )
                        );

                        // Comprueba si el usuario actual sigue inscripto.
                        const estaInscripto = jornadaActualizada.jugadoresInscriptos.some(
                            (jugador) => String(jugador.id) === String(usuario.id)
                        );

                        // Actualiza también el listado de jornadas propias.
                        setJornadasInscripto((actuales) => {

                            const jornadasRestantes = actuales.filter(
                                (jornada) => jornada._id !== jornadaActualizada._id
                            );

                            return estaInscripto
                                ? [...jornadasRestantes, jornadaActualizada]
                                : jornadasRestantes;
                        });

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