import Panel from "../ui/Panel";

function StatsPanel() {

    return (

        <Panel>

            <h3 className="font-title text-xl mb-6">

                Estadísticas

            </h3>

            <div
                className="
                    grid
                    grid-cols-2
                    gap-4
                "
            >

                <StatCard titulo="Partidas" valor="42" />

                <StatCard titulo="Victorias" valor="17" />

                <StatCard titulo="Torneos" valor="6" />

                <StatCard titulo="Desafíos" valor="13" />

            </div>

        </Panel>

    );

}

type StatCardProps = {

    titulo: string;

    valor: string;

};

function StatCard({

    titulo,

    valor

}: StatCardProps) {

    return (

        <div
            className="
                rounded-lg
                border
                p-4
                text-center
            "
        >

            <p>{titulo}</p>

            <p
                className="
                    text-3xl
                    font-bold
                    mt-2
                "
            >

                {valor}

            </p>

        </div>

    );

}

export default StatsPanel;