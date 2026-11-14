import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

import GameCard from "../ui/GameCard";

import type { JuegosUsuario } from "../../types/usuario";

import {
    eliminarDeMisJuegos
} from "../../services/juegoService";

import { useAuth } from "../../hooks/useAuth";


interface MyGamesProps {

    juegos: JuegosUsuario[];

}


function MyGamesPanel({
    juegos
}: MyGamesProps) {

    const { token } = useAuth();

    const navigate = useNavigate();

    const [abierto, setAbierto] = useState(false);

function explorarJuegos() {
    navigate("/", { state: { scrollTo: "catalogo-juegos" } });
}


    // Estado local de los juegos mostrados.
    // Nos permite quitar una tarjeta sin recargar toda la página.
    const [misJuegos, setMisJuegos] =
        useState<JuegosUsuario[]>(juegos);


    // Si el componente padre recibe nuevos juegos,
    // actualizamos nuestra copia local.
    useEffect(() => {

        setMisJuegos(juegos);

    }, [juegos]);


    async function handleEliminar(
        idJuego: string
    ) {

        if (!token) {
            return;
        }

        try {

            await eliminarDeMisJuegos(
                token,
                idJuego
            );


            // El backend confirmó la eliminación.
            // Ahora quitamos la tarjeta del estado local.
            setMisJuegos((juegosActuales) =>
                juegosActuales.filter(
                    (juego) => juego.id !== idJuego
                )
            );


        } catch (error) {

            console.error(
                "Error al eliminar juego:",
                error
            );

            alert(
                "No se pudo eliminar el juego"
            );

        }

    }


return (
     <section className="rounded-xl bg-amber-50 shadow overflow-hidden">

         <button
               type="button"
               onClick={() => setAbierto(!abierto)}
               className="flex w-full items-center justify-between p-5 text-left font-title text-xl"
           >
               <span>Mis juegos</span>
               <span>{abierto ? "⌃" : "⌄"}</span>
           </button>

           {abierto && (
           <div className="px-5 pb-5 space-y-4">
               <Button onClick={explorarJuegos}>
                   Explorar juegos
               </Button>


          {misJuegos.length === 0 ? (
                <p className="text-sm leading-relaxed text-stone-700">
                    Todavía no tenés juegos. Explorá el catálogo y sumá
                    los que quieras con el botón APRENDER. Si sos una
                    juegoteka, necesitás al menos uno para poder crear
                    jornadas.
                </p>
            ) : (
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {misJuegos.map((juego) => (
                        <GameCard
                            key={juego.id}
                            titulo={juego.titulo}
                            imagen={juego.imagen}
                            actionLabel="abandonar"
                            onAction={() => handleEliminar(juego.id)}
                        />
                    ))}
                </div>
            )}
        </div>
        )}
    </section>
);

}


export default MyGamesPanel;
