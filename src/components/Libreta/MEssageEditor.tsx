import Button from "../ui/Button";

/**
 * Editor principal.
 *
 * Permite escribir un mensaje
 * o iniciar un desafío.
 */
function MessageEditor() {

    return (

        <section

            className="
                rounded-xl
                bg-amber-50
                p-5
                shadow
            "

        >

            <h2
                className="
                    font-title
                    text-xl
                    mb-4
                "
            >
                Mensaje
            </h2>

            <textarea

                rows={8}

                placeholder="Escribí tu mensaje..."

                className="
                    w-full
                    rounded-lg
                    border
                    border-amber-300
                    p-3
                    resize-none
                "

            />

            <div className="mt-6">

                <p className="font-semibold mb-2">

                    Tipo

                </p>

                <label className="block">

                    <input
                        type="radio"
                        name="tipo"
                        defaultChecked
                    />

                    {" "}Mensaje

                </label>

                <label className="block mt-2">

                    <input
                        type="radio"
                        name="tipo"
                    />

                    {" "}Desafío

                </label>

            </div>

            <div className="mt-8">

                <Button>

                    ✉ Enviar

                </Button>

            </div>

        </section>

    );

}

export default MessageEditor;