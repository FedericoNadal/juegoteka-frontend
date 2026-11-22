import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import { divIcon } from "leaflet";

import type { LatLngTuple } from "leaflet";

import { useEffect, useState } from "react";

import {
    obtenerJuegotekas
} from "../../services/usuarioService";

import {
    obtenerJornadas
} from "../../services/jornadaService";


import type { Usuario } from "../../types/usuario";
import type { Jornada } from "../../types/jornada";

import { useAuth } from "../../hooks/useAuth";
import Spinner from "../ui/Spinner";

interface MapViewProps {
    onVerJornadas: (juegotekaId: string) => void;
}

const buenosAires: LatLngTuple = [
    -34.6037,
    -58.3816
];

function crearIconoJuegoteka(foto?: string) {

    return divIcon({
        className: "",
        html: `
            <div style="
                width: 48px;
                height: 48px;
                border: 3px solid white;
                border-radius: 50%;
                overflow: hidden;
                background: #fef3c7;
                box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                ${foto
                ? `<img
                            src="${foto}"
                            style="
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            "
                        />`
                : `<span style="font-size: 24px;">🎲</span>`
            }
            </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -26]
    });
}
// Popup con dos vistas: primero la carta de la juegoteka,
// y al click en "Ver jornadas" se reemplaza por el listado.
// Vive en su propio componente para poder usar useState local
// por marcador (cada popup necesita su propio toggle).
interface JuegotekaPopupProps {
    juegoteka: Usuario;
    cantidadJornadas: number;
    onVerJornadas: (juegotekaId: string) => void;
}

// Reemplaza el JuegotekaPopup completo en MapView.tsx.
// No reusa PlayerCard: esa card fue pensada para verse standalone
// (foto 4:3, bloque de about me con altura fija) y no entra en el
// max-width de un popup de Leaflet sin quedar cortada o vacía.
function JuegotekaPopup({
    juegoteka,
    cantidadJornadas,
    onVerJornadas

}: JuegotekaPopupProps) {


    return (
        <div className="w-56">

            {juegoteka.foto && (
                <div className="
                            aspect-[16/9]
                            rounded-sm
                            bg-stone-300
                            overflow-hidden
                            mb-2
                        ">
                    <img
                        src={juegoteka.foto}
                        alt={`Foto de ${juegoteka.nombre}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <p className="text-xs uppercase text-amber-700">
                {juegoteka.rol}
            </p>

            <h3 className="font-title text-lg text-amber-900 truncate">
                {juegoteka.nombre}
            </h3>

            {juegoteka.aboutMe && (
                <p className="
                            text-xs
                            text-stone-600
                            mt-1
                            line-clamp-2
                        ">
                    {juegoteka.aboutMe}
                </p>
            )}

            <button
                type="button"
                onClick={() => onVerJornadas(juegoteka.id)}
                className="
                            mt-3
                            w-full
                            rounded-lg
                            bg-amber-700
                            px-3
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            hover:bg-amber-800
                        "
            >
                Ver jornadas ({cantidadJornadas})
            </button>



        </div>
    );
}

function MapView({ onVerJornadas }: MapViewProps) {

    const { token } = useAuth();

    const [juegotekas, setJuegotekas] =
        useState<Usuario[]>([]);

    const [jornadas, setJornadas] =
        useState<Jornada[]>([]);

    const [, setError] =
        useState<string | null>(null);

    const [cargandoJuegotekas, setCargandoJuegotekas] = useState(true);

    useEffect(() => {

    if (!token) {
        return;
    }
    const tokenActual = token;
    async function cargarJuegotekas() {
        try {
            const datosJuegotekas = await obtenerJuegotekas(tokenActual);
            setJuegotekas(datosJuegotekas);
        } catch (error) {
            console.error("Error al cargar juegotekas del mapa:", error);
            setError("No se pudieron cargar las juegotekas.");
        }finally {
        setCargandoJuegotekas(false);
    }
    }

    async function cargarJornadas() {
        try {
            const datosJornadas = await obtenerJornadas();
            setJornadas(datosJornadas);
        } catch (error) {
            console.error("Error al cargar jornadas del mapa:", error);
            setError("No se pudieron cargar las jornadas.");
        }
    }

    cargarJuegotekas();
    cargarJornadas();

}, [token]);

    return (

        <MapContainer

            center={buenosAires}

            zoom={12}

            scrollWheelZoom={true}

            className="
                w-full
                h-[55vh]
                max-h-[520px]
                rounded-xl
                min-h-[320px]
                shadow-lg
            "
        >

            <TileLayer

                attribution='&copy; OpenStreetMap contributors'

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />
{cargandoJuegotekas && (
    <div className="
        absolute inset-0 z-[1000]
        flex items-center justify-center
        pointer-events-none
    ">
        <div className="rounded-lg bg-transparent px-5 py-3 shadow-lg">
            <Spinner size="lg" label="" />
        </div>
    </div>
)}

            {juegotekas.map((juegoteka) => {

                if (!juegoteka.ubicacion) {
                    return null;
                }

                const [
                    longitud,
                    latitud
                ] = juegoteka.ubicacion.coordinates;

                const posicion: LatLngTuple = [
                    latitud,
                    longitud
                ];

                // Jornadas activas de esta juegoteka puntual
                const jornadasDeJuegoteka = jornadas.filter(
                    (jornada) =>
                        String(jornada.Juegoteka.id) ===
                        String(juegoteka.id)
                );

                return (

                    <Marker
                        key={juegoteka.id}
                        position={posicion}
                        icon={crearIconoJuegoteka(juegoteka.foto)}
                    >

                        <Popup maxWidth={280} minWidth={230}>
                            <JuegotekaPopup
                                juegoteka={juegoteka}
                                cantidadJornadas={jornadasDeJuegoteka.length}
                                onVerJornadas={onVerJornadas}
                            />
                        </Popup>

                    </Marker>

                );

            })}


        </MapContainer>

    );
}


export default MapView;