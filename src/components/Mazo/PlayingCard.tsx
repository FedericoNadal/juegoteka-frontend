import Button from "../ui/Button";

/**
 * PlayingCard
 *
 * Representa una carta desplegada.
 *
 * En esta etapa de maquetado contiene información fija para validar
 * la estructura visual. Más adelante recibirá sus
 * datos mediante props o desde el estado del mazo.
 */
function PlayingCard() {

  return (

    <article
      className="
        w-80
        rounded-2xl
        bg-stone-100
        border-2
        border-amber-800
        p-5
        shadow-lg
      "
    >

      {/* Imagen principal */}
      <div
        className="
          h-40
          rounded-lg
          bg-stone-300
          mb-4
        "
      />

      {/* Tipo de carta */}
      <p className="text-sm uppercase text-amber-700">

        Encuentro

      </p>

      {/* Título */}
      <h2
        className="
          font-title
          text-2xl
          mb-3
        "
      >
        Noche de Catan
      </h2>

      {/* Descripción */}
      <p className="mb-6">

        La Juegoteka La Fortaleza organiza un encuentro
        este viernes a las 19:00.

      </p>

      {/* Acciones disponibles */}
      <div
        className="
          flex
          gap-3
          justify-between
        "
      >

       <Button>{"\u{270D}"}</Button>
    
       <Button>{"\u{1F5D1}"}</Button>

      </div>

    </article>

  );

}

export default PlayingCard;