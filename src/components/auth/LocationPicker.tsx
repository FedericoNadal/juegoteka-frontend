import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents
} from "react-leaflet";

import type {
    LatLngTuple
} from "leaflet";

import type {
    Ubicacion
} from "../../types/usuario";

interface LocationPickerProps {
    value?: Ubicacion;
    onChange: (ubicacion: Ubicacion) => void;
}

function MapClickHandler({
    onChange
}: {
    onChange: (ubicacion: Ubicacion) => void;
}) {

    useMapEvents({

        click(event) {

            const {
                lat,
                lng
            } = event.latlng;

            onChange({
                type: "Point",

                // GeoJSON / MongoDB:
                // [longitud, latitud]
                coordinates: [
                    lng,
                    lat
                ]
            });
        }
    });

    return null;
}

const buenosAires: LatLngTuple = [
    -34.6037,
    -58.3816
];

export default function LocationPicker({
    value,
    onChange
}: LocationPickerProps) {

    const posicion: LatLngTuple | undefined =
        value
            ? [
                value.coordinates[1],
                value.coordinates[0]
            ]
            : undefined;

    return (

        <div className="space-y-2">

            <p className="text-sm font-medium text-stone-700">
                Ubicación
            </p>

            <p className="text-xs text-stone-500">
                Seleccioná la ubicación en el mapa.
            </p>

            <MapContainer
                center={buenosAires}
                zoom={12}
                scrollWheelZoom={true}
                className="
                    w-full
                    h-[320px]
                    rounded-xl
                    shadow-lg
                "
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapClickHandler
                    onChange={onChange}
                />

                {posicion && (
                    <Marker
                        position={posicion}
                    />
                )}

            </MapContainer>

            {value && (
                <p className="text-xs text-stone-500">
                    Coordenadas: {value.coordinates[1].toFixed(5)},
                    {" "}
                    {value.coordinates[0].toFixed(5)}
                </p>
            )}

        </div>
    );
}