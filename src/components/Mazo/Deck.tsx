
/**
 * Deck
 *
 * Representa la pila de cartas pendientes.
 *
 * En versiones futuras administrará:
 * - orden del mazo
 * - extracción
 * - descarte
 * - animaciones
 */
function Deck() {

  return (

    <section
      className="
        flex
        flex-col
        items-center
        gap-8
      "
    >

       

      {/* Representación temporal del mazo */}
      <div
        className="
          w-20
          h-28
          rounded-xl
          border-2
          border-amber-900
          bg-amber-900
          text-white
          flex
          items-center
          justify-center
          cursor-pointer
        "
      >
        MAZO
      </div>

      

    </section>

  );

}

export default Deck;