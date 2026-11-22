import { useState } from "react";

import Panel from "../../components/ui/Panel";
import PageTitle from "../../components/ui/PageTitle";

import UsuariosAdmin from "../../components/Admin/UsuariosAdmin";
import JornadasAdmin from "../../components/Admin/JornadasAdmin";
import JuegosAdmin from "../../components/Admin/JuegosAdmin";

function Admin() {
    const [usuariosAbierto, setUsuariosAbierto] = useState(true);
    const [jornadasAbierto, setJornadasAbierto] = useState(false);
    const [juegosAbierto, setJuegosAbierto] = useState(false);

    const [usuariosMontado, setUsuariosMontado] = useState(true);
    const [jornadasMontado, setJornadasMontado] = useState(false);
    const [juegosMontado, setJuegosMontado] = useState(false);

    return (
        <Panel>
            <PageTitle>
                Administración
            </PageTitle>

            <div className="flex flex-col gap-4">

                {/* Usuarios */}
                <details
                    open={usuariosAbierto}
                    onToggle={event => {
                        const abierto = event.currentTarget.open;
                        setUsuariosAbierto(abierto);

                        if (abierto) {
                            setUsuariosMontado(true);
                        }
                    }}
                    className="rounded-xl border border-amber-900/20 bg-amber-50 p-4"
                >
                    <summary className="cursor-pointer text-xl font-bold text-amber-900">
                        Usuarios
                    </summary>

                    {usuariosMontado && (
                        <div className="mt-6">
                            <UsuariosAdmin />
                        </div>
                    )}
                </details>

                {/* Jornadas */}
                <details
                    open={jornadasAbierto}
                    onToggle={event => {
                        const abierto = event.currentTarget.open;
                        setJornadasAbierto(abierto);

                        if (abierto) {
                            setJornadasMontado(true);
                        }
                    }}
                    className="rounded-xl border border-amber-900/20 bg-amber-50 p-4"
                >
                    <summary className="cursor-pointer text-xl font-bold text-amber-900">
                        Jornadas
                    </summary>

                    {jornadasMontado && (
                        <div className="mt-6">
                            <JornadasAdmin />
                        </div>
                    )}
                </details>

                {/* Juegos */}
                <details
                    open={juegosAbierto}
                    onToggle={event => {
                        const abierto = event.currentTarget.open;
                        setJuegosAbierto(abierto);

                        if (abierto) {
                            setJuegosMontado(true);
                        }
                    }}
                    className="rounded-xl border border-amber-900/20 bg-amber-50 p-4"
                >
                    <summary className="cursor-pointer text-xl font-bold text-amber-900">
                        Juegos
                    </summary>

                    {juegosMontado && (
                        <div className="mt-6">
                            <JuegosAdmin />
                        </div>
                    )}
                </details>

            </div>
        </Panel>
    );
}

export default Admin;