import { useState } from "react";

export interface CambiarPasswordData {
    passVieja: string;
    passNueva: string;
}

interface ChangePasswordFormProps {
    onSave(datos: CambiarPasswordData): Promise<void>;
    onCancel(): void;
    loading?: boolean;
    error?: string | null;
}

function ChangePasswordForm({
    onSave,
    onCancel,
    loading = false,
    error = null
}: ChangePasswordFormProps) {

    const [passVieja, setPassVieja] = useState("");
    const [passNueva, setPassNueva] = useState("");
    const [passNuevaConfirmacion, setPassNuevaConfirmacion] = useState("");

    // Validación puramente de UI: que las dos veces que se tipeó la
    // contraseña nueva coincidan. El resto de las reglas (que no sea
    // igual a la anterior, etc.) las valida el backend y llegan via `error`.
    const [errorLocal, setErrorLocal] = useState<string | null>(null);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (passNueva !== passNuevaConfirmacion) {
            setErrorLocal("Las contraseñas nuevas no coinciden.");
            return;
        }

        setErrorLocal(null);

        await onSave({ passVieja, passNueva });
    }

    const errorAMostrar = errorLocal ?? error;

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <div>

                <label
                    htmlFor="passVieja"
                    className="block text-sm font-medium text-stone-700"
                >
                    Contraseña actual
                </label>

                <input
                    id="passVieja"
                    type="password"
                    value={passVieja}
                    onChange={(event) =>
                        setPassVieja(event.target.value)
                    }
                    required
                    className="
                        mt-1
                        w-full
                        rounded-sm
                        border
                        border-stone-300
                        bg-stone-50
                        px-3
                        py-2
                    "
                />

            </div>


            <div>

                <label
                    htmlFor="passNueva"
                    className="block text-sm font-medium text-stone-700"
                >
                    Contraseña nueva
                </label>

                <input
                    id="passNueva"
                    type="password"
                    value={passNueva}
                    onChange={(event) =>
                        setPassNueva(event.target.value)
                    }
                    required
                    minLength={4}
                    className="
                        mt-1
                        w-full
                        rounded-sm
                        border
                        border-stone-300
                        bg-stone-50
                        px-3
                        py-2
                    "
                />

            </div>


            <div>

                <label
                    htmlFor="passNuevaConfirmacion"
                    className="block text-sm font-medium text-stone-700"
                >
                    Confirmar contraseña nueva
                </label>

                <input
                    id="passNuevaConfirmacion"
                    type="password"
                    value={passNuevaConfirmacion}
                    onChange={(event) =>
                        setPassNuevaConfirmacion(event.target.value)
                    }
                    required
                    minLength={4}
                    className="
                        mt-1
                        w-full
                        rounded-sm
                        border
                        border-stone-300
                        bg-stone-50
                        px-3
                        py-2
                    "
                />

            </div>


            {errorAMostrar && (
                <p className="text-sm text-red-700">
                    {errorAMostrar}
                </p>
            )}


            <div className="flex gap-3 pt-2">

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="
                        flex-1
                        rounded-sm
                        border
                        border-stone-400
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-stone-700
                        hover:bg-stone-100
                        disabled:opacity-50
                    "
                >
                    Cancelar
                </button>


                <button
                    type="submit"
                    disabled={loading}
                    className="
                        flex-1
                        rounded-sm
                        bg-amber-800
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        hover:bg-amber-900
                        disabled:opacity-50
                    "
                >
                    {loading
                        ? "Guardando..."
                        : "Cambiar contraseña"}
                </button>

            </div>

        </form>
    );
}


export default ChangePasswordForm;