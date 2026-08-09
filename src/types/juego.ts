export interface Juego {
    _id: string;

    titulo: string;
    imagen?: string;

    descripcion: string;
    reglamento: string;

    cantJugadoresMax: number;
    cantJugadoresMin: number;

    tiempoEstimado: number;

    estado: "activo" | "eliminado";
}