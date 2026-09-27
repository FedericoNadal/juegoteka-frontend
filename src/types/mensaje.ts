export interface Mensaje {

    _id: string;

    remitente: string;

    destinatario: string;

    contenido: string;

    tipo: string;

    referencia?: string;

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