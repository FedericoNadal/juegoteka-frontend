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

interface HeroProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
}

/**
 * Hero
 *
 * Presenta la identidad de Juegoteka y ofrece
 * puntos de entrada hacia la autenticación y el catálogo.
 */
function Hero({ isAuthenticated, onLoginClick }: HeroProps) {
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

      <div className="flex flex-col items-center gap-3">
        {!isAuthenticated && (
          <Button onClick={onLoginClick}>
            Iniciar sesión / Crear cuenta
          </Button>
        )}

        <Button
          onClick={() => {
            document
              .getElementById("catalogo-juegos")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Explorar juegos
        </Button>
      </div>
    </section>
  );
}

export default Hero;