import { useState } from "react";

import MapView from "../Mapa/MapView";


interface MapPanelProps {
    onVerJornadas: (juegotekaId: string) => void;
}

function MapPanel({ onVerJornadas }: MapPanelProps) {

    const [abierto, setAbierto] = useState(false);

    return (
        <section
            className="
                rounded-xl
                bg-amber-50
                shadow
                overflow-hidden
            "
        >

            <button
                type="button"
                onClick={() => setAbierto(!abierto)}
                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    p-5
                    text-left
                    font-title
                    text-xl
                "
            >
                <span>Mapa</span>

                <span>
                    {abierto ? "⌃" : "⌄"}
                </span>
            </button>


            {abierto && (

                <div className="px-5 pb-5">

             <MapView onVerJornadas={onVerJornadas} />

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

                </div>

            )}

        </section>
    );
}

export default MapPanel;

