export interface Mensaje {

    _id: string;

    remitente: string;

    destinatario: string;

    contenido: string;

    tipo: string;

    referencia?: string;
    
    imagen?: string; // 👈 Campo de imagen opcional

    leido: boolean;

    createdAt: string;

    updatedAt: string;

}

export interface MensajesResponse {

    total: number;

    page: number;

    totalPages: number;

    mensajes: Mensaje[];

}