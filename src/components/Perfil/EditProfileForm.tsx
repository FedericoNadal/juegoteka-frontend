import {
    useState
} from "react";

import type {
    Ubicacion,
    Usuario,
    UpdateUsuarioData
} from "../../types/usuario";

import LocationPicker from "../auth/LocationPicker";



interface EditProfileFormProps {

    usuario: Usuario;

    onSave(
        datos: UpdateUsuarioData
    ): Promise<void>;

    onCancel(): void;

    loading?: boolean;

    error?: string | null;
}



function EditProfileForm({
    usuario,
    onSave,
    onCancel,
    loading = false,
    error = null
}: EditProfileFormProps) {


    const [nombre, setNombre] =
        useState(usuario.nombre);

    const [apellido, setApellido] =
        useState(usuario.apellido);

    const [mail, setMail] =
        useState(usuario.mail);

    const [telefono, setTelefono] =
        useState(usuario.telefono);

    const [direccion, setDireccion] =
        useState(usuario.direccion);

    const [foto, setFoto] =
        useState(usuario.foto ?? "");

    const [aboutMe, setAboutMe] =
        useState(usuario.aboutMe ?? "");

    const [ubicacion, setUbicacion] =
        useState<Ubicacion | undefined>(
            usuario.ubicacion
        );


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        const datos: UpdateUsuarioData = {

            nombre,
            apellido,
            mail,
            telefono,
            direccion,

            ...(foto.trim()
                ? { foto: foto.trim() }
                : {}),

            ...(aboutMe.trim()
                ? { aboutMe: aboutMe.trim() }
                : {}),

            ...(ubicacion
                ? { ubicacion }
                : {})
        };


        await onSave(datos);
    }



    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <div>

                <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-stone-700"
                >
                    Usuario
                </label>

                <input
                    id="userName"
                    type="text"
                    value={usuario.userName}
                    disabled
                    className="
                        mt-1
                        w-full
                        rounded-sm
                        border
                        border-stone-300
                        bg-stone-200
                        px-3
                        py-2
                        text-stone-500
                    "
                />

            </div>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>

                    <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-stone-700"
                    >
                        Nombre
                    </label>

                    <input
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={(event) =>
                            setNombre(event.target.value)
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
                        htmlFor="apellido"
                        className="block text-sm font-medium text-stone-700"
                    >
                        Apellido
                    </label>

                    <input
                        id="apellido"
                        type="text"
                        value={apellido}
                        onChange={(event) =>
                            setApellido(event.target.value)
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

            </div>


            <div>

                <label
                    htmlFor="mail"
                    className="block text-sm font-medium text-stone-700"
                >
                    Mail
                </label>

                <input
                    id="mail"
                    type="email"
                    value={mail}
                    onChange={(event) =>
                        setMail(event.target.value)
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
                    htmlFor="telefono"
                    className="block text-sm font-medium text-stone-700"
                >
                    Teléfono
                </label>

                <input
                    id="telefono"
                    type="tel"
                    value={telefono}
                    onChange={(event) =>
                        setTelefono(event.target.value)
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
                    htmlFor="direccion"
                    className="block text-sm font-medium text-stone-700"
                >
                    Dirección
                </label>

                <input
                    id="direccion"
                    type="text"
                    value={direccion}
                    onChange={(event) =>
                        setDireccion(event.target.value)
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
                    htmlFor="foto"
                    className="block text-sm font-medium text-stone-700"
                >
                    Foto
                </label>

                <input
                    id="foto"
                    type="url"
                    value={foto}
                    onChange={(event) =>
                        setFoto(event.target.value)
                    }
                    placeholder="URL de la imagen"
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
                    htmlFor="aboutMe"
                    className="block text-sm font-medium text-stone-700"
                >
                    Sobre mí
                </label>

                <textarea
                    id="aboutMe"
                    value={aboutMe}
                    onChange={(event) =>
                        setAboutMe(event.target.value)
                    }
                    maxLength={160}
                    rows={5}
                    className="
                        mt-1
                        w-full
                        resize-none
                        rounded-sm
                        border
                        border-stone-300
                        bg-stone-50
                        px-3
                        py-2
                    "
                />

                <p className="mt-1 text-right text-xs text-stone-500">
                    {aboutMe.length}/160
                </p>

            </div>


            <LocationPicker
                value={ubicacion}
                onChange={setUbicacion}
            />


            {error && (
                <p className="text-sm text-red-700">
                    {error}
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
                        : "Guardar cambios"}
                </button>

            </div>

        </form>
    );
}


export default EditProfileForm;