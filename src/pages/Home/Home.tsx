import Button from "../../components/ui/Button";
import Panel from "../../components/ui/Panel";
import SectionTitle from "../../components/ui/SectionTitle";

function Home() {
  return (
    <main>

      <Panel>

        <SectionTitle>
          Bienvenido a Juegoteka
        </SectionTitle>

        <p className="mb-6 text-lg">
          Organizá tus juegos, encuentros y grupos
          de una forma simple y agradable.
        </p>

        <Button>
          Explorar juegos
        </Button>

      </Panel>

      <Panel>

        <SectionTitle>
          ¿Qué es Juegoteka?
        </SectionTitle>

        <p>
          Una plataforma para gestionar tu colección,
          planificar encuentros y descubrir nuevos juegos.
        </p>

      </Panel>

    </main>
  );
}

export default Home;