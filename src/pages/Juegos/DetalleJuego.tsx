import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { Juego } from "../../types/juego";
import { obtenerJuegoPorId } from "../../services/juegoService";

import Container from "../../components/ui/Container";
import Panel from "../../components/ui/Panel";
import SectionTitle from "../../components/ui/SectionTitle";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";

function DetalleJuego() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [juego, setJuego] = useState<Juego | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        async function cargarJuego() {

            if (!id) {
                setError("No se especificó un juego.");
                setIsLoading(false);
                return;
            }

            try {

                const datos = await obtenerJuegoPorId(id);
                setJuego(datos);

            } catch (error) {

                console.error("Error al cargar el juego:", error);
                setError("No se pudo cargar la información del juego.");

            } finally {

                setIsLoading(false);

            }
        }

        cargarJuego();

    }, [id]);

   if (isLoading) {
    return (
        <div className="flex justify-center py-12">
            <Spinner size="lg" label="Cargando juego..." />
        </div>
    );
}

    if (error || !juego) {
        return (
            <Panel>
                <p className="text-red-700">
                    {error || "Juego no encontrado."}
                </p>

                <Button onClick={() => navigate("/")}>
                    Volver al catálogo
                </Button>
            </Panel>
        );
    }

    return (
        <Container>

            <Panel>

                <SectionTitle>
                    {juego.titulo}
                </SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="flex justify-center">

                        {juego.imagen ? (
                            <img
                                src={juego.imagen}
                                alt={juego.titulo}
                                className="
                                    w-full max-w-md
                                    max-h-96
                                    object-contain
                                    rounded-lg
                                "
                            />
                        ) : (
                            <div className="text-8xl">
                                🎲
                            </div>
                        )}

                    </div>

                    <div className="space-y-5">

                        <div>
                            <h3 className="font-bold text-amber-900">
                                Descripción
                            </h3>

                            <p className="text-stone-800 whitespace-pre-line">
                                {juego.descripcion}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 text-stone-700">

                            <span>
                                👥 {juego.cantJugadoresMin}-
                                {juego.cantJugadoresMax} jugadores
                            </span>

                            <span>
                                ⏳ {juego.tiempoEstimado} minutos
                            </span>

                        </div>

                    </div>

                </div>

                <div className="mt-10">

                    <SectionTitle>
                        Reglamento
                    </SectionTitle>

                    <div className="
                        bg-amber-50/80
                        rounded-lg
                        p-5
                        text-stone-800
                        whitespace-pre-line
                        leading-relaxed
                    ">
                        {juego.reglamento}
                    </div>

                </div>

                <div className="mt-8 flex justify-center">

                    <Button onClick={() => navigate("/")}>
                        Volver al catálogo
                    </Button>

                </div>

            </Panel>

        </Container>
    );
}

export default DetalleJuego;