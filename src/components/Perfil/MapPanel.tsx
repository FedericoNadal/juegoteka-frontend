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
                bg-amber-50/50
                shadow
                overflow-hidden


            "
        >

            <button
                type="button"
                onClick={() => setAbierto(!abierto)}
               className="
        relative flex w-full items-center justify-center
        p-5 font-title text-xl
    "
            >
                <span> 🌎 JuegoteKas </span>

                <span>
                    {abierto ? "⌃" : ""}
                </span>
            </button>


            {abierto && (

                <div className="px-5 pb-5">

             <MapView onVerJornadas={onVerJornadas} />


                </div>

            )}

        </section>
    );
}

export default MapPanel;

