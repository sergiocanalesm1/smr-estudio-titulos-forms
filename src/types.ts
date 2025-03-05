export type InmueblesForm = {
    escritura881: File[];
    linderosGenerales: File[];
    pazYSalvo: File[];
    valorOperacion: string;
    bbva: {
        hipoteca: File[];
        manifestacionPago: string;
        manifestacionCliente: string;
    }
}

export type DatosCompradorForm = Datos & (DatosNatural | DatosJuridico) & {
    nombreCliente: string;
    email: string;
    identificacion: string;
    direccion: string;
    tel: string;
    barrio: string;
    localidad: string;
    departamento: string;
    codigoPostal: string;
    certificadosTradicion: string;
}

export type DatosVendedorForm = Datos & (DatosNatural | DatosJuridico)

export interface Datos {
    ids: File[];
    poder: File[];
}

export type DatosNatural = {
    estadoCivil: string;
}

export type DatosJuridico = {
    certificadoExistencia: File[];
    certificadoComposicion: File[];
}

export type PersonType = 'Natural' | 'Juridico';

export type PartyType = 'Comprador' | 'Vendedor';