import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

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

interface MapViewProps {
    onVerJornadas: (juegotekaId: string) => void;
}

const buenosAires: LatLngTuple = [
    -34.6037,
    -58.3816
];

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

    useEffect(() => {

        if (!token) {
            return;
        }

        const tokenActual = token;

        async function cargarDatos() {

            try {

                // Jornadas es pública, no necesita token — se pide igual
                // en paralelo para no encadenar esperas innecesarias.
                const [datosJuegotekas, datosJornadas] =
                    await Promise.all([
                        obtenerJuegotekas(tokenActual),
                        obtenerJornadas()
                    ]);

                setJuegotekas(datosJuegotekas);
                setJornadas(datosJornadas);

            } catch (error) {

                console.error(
                    "Error al cargar datos del mapa:",
                    error
                );

                setError(
                    "No se pudieron cargar los datos del mapa."
                );
            }
        }

        cargarDatos();

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