import { ClientFormState } from "../types";

export const sectionNames: Record<keyof ClientFormState, string> = {
    datosComprador: 'Datos del Comprador',
    inmuebles: 'Documentos de Inmuebles',
    datosVendedor: 'Datos del Vendedor',
    notaria: 'Notaría',
    soportePago: 'Pago',
}