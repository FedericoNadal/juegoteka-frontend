export interface JuegotekaJornada {
    id: string;
    nombre: string;
    direccion: string;
}

export interface JuegoDisponible {
    id: string;
    titulo: string;
    imagen: string;
}

export interface JugadorInscripto {
    id: string;
    userName: string;
}

export interface Encuentro {
    _id: string;
    tipo: "torneo" | "desafío";
    capacidad: number;
    juego: {
        id_juego: string;
        nombre: string;
        imagen: string;
    }[];
    jugadores: {
        id_jugador: string;
        userName: string;
        estado: "pendiente" | "confirmado";
    }[];
    ganador: string;
    estado:
        | "cancelado"
        | "pendiente"
        | "en proceso"
        | "finalizado";
}

export interface Jornada {
    _id: string;

    nombre: string;

    fechaHora: string;

    precioInscripcion: number;

    capacidad: number;

    estado:
        | "cancelado"
        | "activo"
        | "finalizado";

    Juegoteka: JuegotekaJornada;

    juegosDisponibles: JuegoDisponible[];

    jugadoresInscriptos: JugadorInscripto[];

    encuentros: Encuentro[];
}