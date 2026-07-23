type ProfileTabsProps = {

    activeTab: string;

    onTabChange: (tab: string) => void;

};

/**
 * Navegación del tablero personal.
 */

function ProfileTabs({

    activeTab,
    onTabChange

}: ProfileTabsProps) {

    const tabs = [

        ["lore", "Lore"],
        ["games", "Mis juegos"],
        ["stats", "Estadísticas"],
        ["settings", "Configuración"]

    ];

    return (

        <nav
            className="
                flex
                flex-wrap
                justify-center
                gap-2
                mb-6
            "
        >

            {tabs.map(([id, label]) => (

                <button

                    key={id}

                    onClick={() => onTabChange(id)}

                    className={`
                        px-4
                        py-2
                        rounded-md
                        border
                        transition

                        ${
                            activeTab === id

                            ? "bg-amber-700 text-white"

                            : "bg-amber-100 hover:bg-amber-200"
                        }
                    `}

                >

                    {label}

                </button>

            ))}

        </nav>

    );

}

export default ProfileTabs;