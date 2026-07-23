/**
 * Cabecera del perfil.
 *
 * Presenta la información básica del usuario.
 *
 * En versiones futuras estos datos se obtendrán
 * desde la API y podrán editarse.
 */

function ProfileHeader() {

    return (

        <section
            className="
                flex
                flex-col
                items-center
                gap-3
                mb-6
            "
        >

            {/* Avatar */}
            <div
                className="
                    w-28
                    h-28
                    rounded-full
                    bg-amber-200
                    border-4
                    border-amber-700
                "
            />

            <h2
                className="
                    font-title
                    text-2xl
                    text-amber-900
                "
            >
                Jaime Fulanito
            </h2>

            <p className="text-amber-700">
                Jugador
            </p>

        </section>

    );

}

export default ProfileHeader;