import type { DatosCompradorForm, DatosVendedorForm, InmueblesForm } from "../types";

const datosDefaults = {
  ids: [],
  poder: []
}

export const datosCompradorFormDefaults: Partial<DatosCompradorForm> = {
  ...datosDefaults,
  nombreCliente: '',
  identificacion: '',
  direccion: '',
  email: '',
  tel: '',
  barrio: '',
  localidad: '',
  departamento: '',
  codigoPostal: '',
  certificadosTradicion: '',
};

export const datosVendedorFormDefaults: Partial<DatosVendedorForm> = {
  ...datosDefaults
}

export const datosJuridicoDefaults = {
  certificadoExistencia: [],
  certificadoComposicion: [],
};

export const datosNaturalDefaults = {
  estadoCivil: '',
};

export const documentosInmueblesFormDefaults: InmueblesForm = {
  escritura881: [],
  linderosGenerales: [],
  pazYSalvo: [],
  valorOperacion: '',
};
