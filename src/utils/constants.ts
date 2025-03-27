import { ClientFormState } from "../types";

export const sectionNames: Record<keyof ClientFormState, string> = {
    datosComprador: 'Datos del Comprador',
    documentosInmuebles: 'Documentos de/los Inmueble(s)',
    datosVendedor: 'Datos del Vendedor',
    notaria: 'Notaría',
    soportePago: 'Pago',
}