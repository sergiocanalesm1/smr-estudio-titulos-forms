export type ClientFormState = {
    datosComprador: DatosCompradorForm & (DatosNatural | DatosJuridico);
    datosVendedor: DatosVendedorForm & (DatosNatural | DatosJuridico);
    documentosInmuebles: InmueblesForm;
    notaria: string;
    soportePago: File[];
};

export type InmueblesForm = {
    escritura881: File[];
    linderos: File[];
    pazYSalvo: File[];
    valorOperacion: string;
    hipoteca?: {
        banco: string;
        id: File[];
        manifestacionPago: string;
        manifestacionCliente: string;
    }
}

export type DatosCompradorForm = Datos & (DatosNatural | DatosJuridico) & {
    nombreCliente: string;
    email: string;
    identificacion: {
        tipo: string;
        numero: string;
    };
    direccion: string;
    tel: string;
    ciudad: string,
    departamento: string;
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

export interface InternalFormInputs {
    caseID: string;
    compradorName: string;
    compradorEmail: string;
    compradorType: PersonType;
    paymentValue: string;
    bancoHipoteca: string;
    approval: File[];
    valuation: File[];
    tradition: File[];
}