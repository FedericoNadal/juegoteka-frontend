import { MapContainer, TileLayer } from "react-leaflet";

import type { LatLngTuple } from "leaflet";



/**
 * Coordenadas del centro inicial.
 *
 * Por ahora utilizamos la Ciudad de Buenos Aires
 * como ubicación por defecto durante el desarrollo.
 *
 * Más adelante esta posición podrá obtenerse:
 * - desde la ubicación del usuario;
 * - desde una búsqueda;
 * - desde una juegoteka seleccionada.
 */
const buenosAires: LatLngTuple = [-34.6037, -58.3816];


/**
 * MapView
 *
 * Componente responsable únicamente de renderizar
 * el mapa base utilizando OpenStreetMap.
 *
 * En esta primera versión no existen marcadores
 * ni interacción.
 */
function MapView() {
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

            {/* Capa base provista por OpenStreetMap */}
            <TileLayer

                attribution='&copy; OpenStreetMap contributors'

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />

        </MapContainer>

    );
}

export default MapView;