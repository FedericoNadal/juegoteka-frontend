import Panel from "../ui/Panel";

/**
 * Información pública del jugador.
 */

function LorePanel() {

    return (

        <Panel>

            <h3 className="font-title text-xl mb-4">

                Lore

            </h3>

            <textarea

                rows={8}

                readOnly

                value={
`Siempre llevo Brass a las juntadas.

Prefiero juegos de estrategia antes que party games.

`
                }

                className="
                    w-full
                    rounded-md
                    border
                    p-3
                "

            />

        </Panel>

    );

}

export default LorePanel;