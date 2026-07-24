import MapView from "../../components/Mapa/MapView";
import Container from "../../components/ui/Container";
//import PageTitle from "../../components/ui/PageTitle";
import Panel from "../../components/ui/Panel";

/**
 * Página Mapa
 *
 * El mapa constituye la puerta de entrada espacial
 * a la comunidad de Juegoteka.
 *
 * Desde aquí el usuario podrá descubrir juegotekas,
 * encuentros y, en versiones futuras, otros jugadores
 * cercanos.
 *
 * En esta primera iteración únicamente se presenta
 * el mapa base centrado en la Ciudad de Buenos Aires.
 */
function Mapa() {

  return (

    <main>

      <Container>

        <input
          type="text"
          placeholder="  🔍 Buscar juegoteka..."
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

        {/* 
                    El mapa se presenta dentro de un Panel para
                    mantener la coherencia visual con el resto
                    de la aplicación. La intención es que evoque
                    un mapa desplegado sobre una mesa de juego
                    y no un mapa aislado ocupando toda la pantalla.
                */}
        <Panel >

          <MapView />

          {/* Texto descriptivo temporal.
                        Más adelante este espacio podrá mostrar:
                        - cantidad de juegotekas encontradas;
                        - filtros activos;
                        - próximos encuentros;
                        - información contextual.
                    */}
          <p
            className="
                            mt-4
                            text-center
                            text-stone-700
                            leading-relaxed
                        "
          >
            Explorá las juegotekas de la ciudad y descubrí
            nuevos espacios para jugar, organizar encuentros
            y conocer comunidades lúdicas.
          </p>

        </Panel>

      </Container>

    </main>

  );

}

export default Mapa;