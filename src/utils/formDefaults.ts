import { DatosCompradorForm, DatosVendedorForm } from "../pages/ClientForm/sections/DatosAgente";
import { DocumentosInmueblesForm } from "../pages/ClientForm/sections/DocumentosInmuebles";

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

export const documentosInmueblesFormDefaults: DocumentosInmueblesForm = {
  escritura881: [],
  linderosGenerales: [],
  pazYSalvo: [],
  valorOperacion: '',
};
