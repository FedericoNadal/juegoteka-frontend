/**
 * Barra de búsqueda.
 *
 * Permitirá localizar rápidamente jugadores.
 *
 * Más adelante podrá consultar directamente
 * la API mediante debounce.
 */
function SearchBar() {

    return (

        <input

            type="text"

            placeholder="🔎 Buscar jugador..."

            className="
                w-full
                rounded-xl
                border
                border-amber-300
                bg-amber-50
                px-4
                py-3
                shadow-sm
            "

        />

    );

}

export default SearchBar;