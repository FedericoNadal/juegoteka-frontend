import { useEffect, useState } from "react";

import MapView from "../../components/Mapa/MapView";
import JornadasList from "../../components/Mapa/JornadasList";
import JornadaOffCanvas from "../../components/Mapa/JornadaOffCanvas";

import Container from "../../components/ui/Container";
import Panel from "../../components/ui/Panel";

import type { Jornada } from "../../types/jornada";

import { obtenerJornadas } from "../../services/jornadaService";

import { inscribirseEnJornada } from "../../services/jornadaService";


/**
 * Página Mapa
 *
 * El mapa permite descubrir:
 *
 * - juegotekas espacialmente;
 * - jornadas temporalmente.
 *
 * Al seleccionar una jornada se abre
 * su detalle sin abandonar esta página.
 */
function Mapa() {

    /*
     * Jornadas disponibles.
     */
    const [jornadas, setJornadas] =
        useState<Jornada[]>([]);


    /*
     * Jornada seleccionada.
     *
     * null = ninguna seleccionada.
     */
    const [jornadaSeleccionada, setJornadaSeleccionada] =
        useState<Jornada | null>(null);


    /*
     * Cargamos las jornadas al entrar
     * en la página.
     */
    useEffect(() => {

        const cargarJornadas = async () => {

            try {

                const data =
                    await obtenerJornadas();

                setJornadas(data);

            } catch (error) {

                console.error(
                    "Error al cargar jornadas:",
                    error
                );

            }

        };

        cargarJornadas();

    }, []);


    return (

        <main>

            <Container>

                {/* BUSCADOR */}

                <input
                    type="text"
                    placeholder="🔍 Buscar juegoteka..."
                    className="
                        w-full
                        rounded-lg
                        border
                        border-amber-700
                        bg-amber-50
                        px-4
                        py-2
                        mt-2
                        focus:outline-none
                        focus:ring-2
                        focus:ring-amber-600
                    "
                />


                {/* MAPA + JORNADAS */}

                <div
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]
                        gap-6
                        mt-4
                        items-start
                    "
                >

                    {/* MAPA */}

                    <Panel>

                        <MapView />

                        <p
                            className="
                                mt-4
                                text-center
                                text-stone-700
                                leading-relaxed
                            "
                        >
                            Explorá las juegotekas de la ciudad
                            y descubrí nuevos espacios para jugar,
                            organizar encuentros y conocer
                            comunidades lúdicas.
                        </p>

                    </Panel>


                    {/* JORNADAS */}

                    <JornadasList
                        jornadas={jornadas}
                        onSelectJornada={
                            setJornadaSeleccionada
                        }
                    />

                </div>


                {/* DETALLE */}

              <JornadaOffCanvas
    jornada={jornadaSeleccionada}
    onClose={() =>
        setJornadaSeleccionada(null)
    }
    onJornadaActualizada={(jornadaActualizada) => {

        /*
         * Actualizamos la jornada que estamos viendo
         * en el OffCanvas.
         */
        setJornadaSeleccionada(jornadaActualizada);

        /*
         * También actualizamos la jornada dentro
         * de la lista.
         */
        setJornadas((jornadasActuales) =>
            jornadasActuales.map((jornada) =>
                jornada._id === jornadaActualizada._id
                    ? jornadaActualizada
                    : jornada
            )
        );
    }}
/>

            </Container>

        </main>

    );
}

export default Mapa;