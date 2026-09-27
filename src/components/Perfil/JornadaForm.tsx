import { useState } from "react";
import { crearJornada } from "../../services/jornadaService";
import { useAuth } from "../../hooks/useAuth";

import type { Jornada } from "../../types/jornada";

interface JornadaFormProps {
    onClose: () => void;
    onCreada: (jornada: Jornada) => void;
}

function JornadaForm({
    onClose,
    onCreada
}: JornadaFormProps) {
    const [nombre, setNombre] = useState("");
    const [fechaHora, setFechaHora] = useState("");
    const [precioInscripcion, setPrecioInscripcion] = useState("");
    const [capacidad, setCapacidad] = useState("");
   
    const { token } = useAuth();
    const [error, setError] = useState("");
    const [creando, setCreando] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) return;

    setCreando(true);
    setError("");

    try {
        const jornada = await crearJornada(
            {
                nombre,
                fechaHora,
                precioInscripcion: Number(precioInscripcion),
                capacidad: Number(capacidad)
            },
            token
        );

        onCreada(jornada);
        onClose();
    } catch (error) {
        console.error("Error al crear jornada:", error);

        setError(
            error instanceof Error
                ? error.message
                : "No se pudo crear la jornada"
        );
    } finally {
        setCreando(false);
    }
};

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-title text-2xl">
                        Nueva jornada
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-stone-500"
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <p className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </p>
               )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <label className="flex flex-col gap-1">
                        <span>Nombre</span>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="rounded-lg border p-2"
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Fecha y hora</span>
                        <input
                            type="datetime-local"
                            value={fechaHora}
                            onChange={(e) => setFechaHora(e.target.value)}
                            required
                            className="rounded-lg border p-2"
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Precio de inscripción</span>
                        <input
                            type="number"
                            min="0"
                            value={precioInscripcion}
                            onChange={(e) =>
                                setPrecioInscripcion(e.target.value)
                            }
                            required
                            className="rounded-lg border p-2"
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Capacidad</span>
                        <input
                            type="number"
                            min="1"
                            value={capacidad}
                            onChange={(e) =>
                                setCapacidad(e.target.value)
                            }
                            required
                            className="rounded-lg border p-2"
                        />
                    </label>

                    <div className="mt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border px-4 py-2"
                        >
                            Cancelar
                        </button>

                        <button
                             type="submit"
                            disabled={creando}
                            className="flex-1 rounded-lg bg-stone-800 px-4 py-2 text-white disabled:opacity-50"
                        >
                            {creando ? "Creando..." : "Crear jornada"}
                        </button>
                           
                    </div>
                </form>
            </div>
        </div>
    );
}

export default JornadaForm;