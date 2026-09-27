import { useState, type FormEvent } from "react";

import Button from "../ui/Button";
import LocationPicker from "./LocationPicker";

import type {
    RegisterData
} from "../../types/auth";

import type {
    Ubicacion
} from "../../types/usuario";

interface RegisterFormProps {
    isLoading?: boolean;
    error?: string | null;

    onRegister: (
        data: RegisterData
    ) => Promise<void>;
}

export default function RegisterForm({
    isLoading = false,
    error = null,
    onRegister,
}: RegisterFormProps) {

    const [userName, setUserName] =
        useState("");

    const [pass, setPass] =
        useState("");

    const [confirmPass, setConfirmPass] =
        useState("");

    const [rol, setRol] =
        useState<"jugador" | "juegoteka">(
            "jugador"
        );

    const [nombre, setNombre] =
        useState("");

    const [apellido, setApellido] =
        useState("");

    const [mail, setMail] =
        useState("");

    const [telefono, setTelefono] =
        useState("");

    const [direccion, setDireccion] =
        useState("");

    const [foto, setFoto] =
        useState("");

    const [ubicacion, setUbicacion] =
        useState<Ubicacion | undefined>();

    const [formError, setFormError] =
        useState<string | null>(null);


    async function handleSubmit(
        e: FormEvent
    ) {

        e.preventDefault();

        setFormError(null);

        if (pass !== confirmPass) {

            setFormError(
                "Las contraseñas no coinciden."
            );

            return;
        }

        if (!ubicacion) {

            setFormError(
                "Seleccioná una ubicación en el mapa."
            );

            return;
        }

        const data: RegisterData = {

            userName,
            pass,
            rol,

            nombre,
            apellido,

            mail,
            telefono,
            direccion,

            ubicacion,

            ...(foto.trim()
                ? { foto: foto.trim() }
                : {})
        };

        await onRegister(data);
    }


    return (

        <form
            onSubmit={handleSubmit}
            className="
                flex-1
                overflow-y-auto
                px-6
                py-8
                flex
                flex-col
                gap-6
            "
        >

            <div>

                <h2 className="
                    text-xl
                    font-semibold
                    text-stone-800
                ">
                    Crear una cuenta
                </h2>

                <p className="
                    mt-1
                    text-sm
                    text-stone-600
                ">
                    Registrate para comenzar a jugar.
                </p>

            </div>


            <div>

                <label
                    htmlFor="registerUserName"
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-stone-700
                    "
                >
                    Usuario
                </label>

                <input
                    id="registerUserName"
                    autoComplete="username"
                    required
                    value={userName}
                    onChange={(e) =>
                        setUserName(e.target.value)
                    }
                    className="
                        w-full
                        border-b-2
                        border-amber-700/40
                        bg-transparent
                        px-1
                        py-2
                        outline-none
                        focus:border-amber-700
                    "
                />

            </div>


            <div>

                <label
                    htmlFor="registerPass"
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-stone-700
                    "
                >
                    Contraseña
                </label>

                <input
                    id="registerPass"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={pass}
                    onChange={(e) =>
                        setPass(e.target.value)
                    }
                    className="
                        w-full
                        border-b-2
                        border-amber-700/40
                        bg-transparent
                        px-1
                        py-2
                        outline-none
                        focus:border-amber-700
                    "
                />

            </div>


            <div>

                <label
                    htmlFor="registerConfirmPass"
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-stone-700
                    "
                >
                    Repetir contraseña
                </label>

                <input
                    id="registerConfirmPass"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPass}
                    onChange={(e) =>
                        setConfirmPass(e.target.value)
                    }
                    className="
                        w-full
                        border-b-2
                        border-amber-700/40
                        bg-transparent
                        px-1
                        py-2
                        outline-none
                        focus:border-amber-700
                    "
                />

            </div>


            <div>

                <label
                    htmlFor="registerRol"
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-stone-700
                    "
                >
                    Tipo de cuenta
                </label>

                <select
                    id="registerRol"
                    value={rol}
                    onChange={(e) =>
                        setRol(
                            e.target.value as
                            "jugador" |
                            "juegoteka"
                        )
                    }
                    className="
                        w-full
                        rounded-md
                        border
                        border-amber-700/40
                        bg-amber-50
                        px-3
                        py-2
                        outline-none
                        focus:border-amber-700
                    "
                >
                    <option value="jugador">
                        Jugador
                    </option>

                    <option value="juegoteka">
                        Juegoteka
                    </option>

                </select>

            </div>


            <div className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
            ">

                <div>

                    <label
                        htmlFor="registerNombre"
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-stone-700
                        "
                    >
                        Nombre
                    </label>

                    <input
                        id="registerNombre"
                        required
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                        className="
                            w-full
                            border-b-2
                            border-amber-700/40
                            bg-transparent
                            px-1
                            py-2
                            outline-none
                            focus:border-amber-700
                        "
                    />

                </div>


                <div>

                    <label
                        htmlFor="registerApellido"
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-stone-700
                        "
                    >
                        Apellido
                    </label>

                    <input
                        id="registerApellido"
                        required
                        value={apellido}
                        onChange={(e) =>
                            setApellido(e.target.value)
                        }
                        className="
                            w-full
                            border-b-2
                            border-amber-700/40
                            bg-transparent
                            px-1
                            py-2
                            outline-none
                            focus:border-amber-700
                        "
                    />

                </div>

            </div>


            <div>

                <label
                    htmlFor="registerMail"
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-stone-700
                    "
                >
                    Email
                </label>

                <input
                    id="registerMail"
                    type="email"
                    autoComplete="email"
                    required
                    value={mail}
                    onChange={(e) =>
                        setMail(e.target.value)
                    }
                    className="
                        w-full
                        border-b-2
                        border-amber-700/40
                        bg-transparent
                        px-1
                        py-2
                        outline-none
                        focus:border-amber-700
                    "
                />

            </div>


            <div>

                <label
                    htmlFor="registerTelefono"
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-stone-700
                    "
                >
                    Teléfono
                </label>

                <input
                    id="registerTelefono"
                    type="tel"
                    required
                    value={telefono}
                    onChange={(e) =>
                        setTelefono(e.target.value)
                    }
                    className="
                        w-full
                        border-b-2
                        border-amber-700/40
                        bg-transparent
                        px-1
                        py-2
                        outline-none
                        focus:border-amber-700
                    "
                />

            </div>


            <div>

                <label
                    htmlFor="registerDireccion"
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-stone-700
                    "
                >
                    Dirección
                </label>

                <input
                    id="registerDireccion"
                    required
                    value={direccion}
                    onChange={(e) =>
                        setDireccion(e.target.value)
                    }
                    className="
                        w-full
                        border-b-2
                        border-amber-700/40
                        bg-transparent
                        px-1
                        py-2
                        outline-none
                        focus:border-amber-700
                    "
                />

            </div>


            <div>

                <label
                    htmlFor="registerFoto"
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-stone-700
                    "
                >
                    Foto (opcional)
                </label>

                <input
                    id="registerFoto"
                    type="url"
                    value={foto}
                    onChange={(e) =>
                        setFoto(e.target.value)
                    }
                    placeholder="https://..."
                    className="
                        w-full
                        border-b-2
                        border-amber-700/40
                        bg-transparent
                        px-1
                        py-2
                        outline-none
                        focus:border-amber-700
                    "
                />

            </div>


            <LocationPicker
                value={ubicacion}
                onChange={setUbicacion}
            />


            {(formError || error) && (

                <div className="
                    rounded-md
                    border
                    border-red-300
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-700
                ">
                    {formError || error}
                </div>

            )}


            <Button
                type="submit"
                disabled={isLoading}
            >
                {isLoading
                    ? "Creando cuenta..."
                    : "Crear cuenta"
                }
            </Button>

        </form>
    );
}