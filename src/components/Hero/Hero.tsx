import Button from "../ui/Button";

/**
 * Hero
 *
 * Componente principal de la página de inicio.
 *
 * Su función es presentar la identidad de Juegoteka y ofrecer
 * un punto de entrada claro hacia la exploración del catálogo.
 *
 * La estructura se mantiene deliberadamente simple para permitir
 * incorporar posteriormente imágenes, texturas o ilustraciones
 * sin modificar la organización del componente.
 */
function Hero() {
  return (

    <section
      className="
        flex
        flex-col
        items-center
        justify-center
        text-center
        py-16
      "
    >

      {/* Título principal del proyecto */}
      <h1
        className="
          font-title
          text-5xl
          font-bold
          text-stone-300
          #text-amber-900
          mb-6
        "
      >
        Juegotekas
      </h1>

      {/* Frase principal que introduce la filosofía del proyecto */}
      <p
        className="
          text-2xl
          text-stone-100
          mb-3
          max-w-2xl
        "
      >
        Las mejores partidas empiezan antes de abrir la caja.
      </p>

      {/* Lema institucional */}
      <p
        className="
          italic
          text-lg
          text-amber-100
          mb-8
        "
      >
        Porque ningún juego se juega solo.
      </p>

      {/* Acción principal disponible para visitantes */}
      <Button>
        Explorar juegos
      </Button>

    </section>

  );
}

export default Hero;