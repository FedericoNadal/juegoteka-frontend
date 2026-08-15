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

import type { Usuario } from "../../types/usuario";

import { useAuth } from "../../hooks/useAuth";

const buenosAires: LatLngTuple = [
    -34.6037,
    -58.3816
];

function MapView() {

    const { token } = useAuth();

    const [juegotekas, setJuegotekas] =
        useState<Usuario[]>([]);

    const [, setError] =
        useState<string | null>(null);

useEffect(() => {

    if (!token) {
        return;
    }

    const tokenActual = token;

    async function cargarJuegotekas() {

        try {

            const datos =
                await obtenerJuegotekas(tokenActual);

            setJuegotekas(datos);

        } catch (error) {

            console.error(
                "Error al cargar juegotekas:",
                error
            );

            setError(
                "No se pudieron cargar las juegotekas."
            );
        }
    }

    cargarJuegotekas();

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


                return (

                    <Marker
                        key={juegoteka.id}
                        position={posicion}
                    >

                        <Popup>

                            <strong>
                                {juegoteka.nombre}
                            </strong>

                            <br />

                            {juegoteka.direccion}

                        </Popup>

                    </Marker>

                );

            })}


        </MapContainer>

    );
}


export default MapView;