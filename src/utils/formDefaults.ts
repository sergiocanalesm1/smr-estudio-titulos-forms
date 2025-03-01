import { DatosCompradorForm } from "../pages/ClientForm/sections/DatosComprador";
import { DocumentosInmueblesForm } from "../pages/ClientForm/sections/DocumentosInmuebles";

export const datosCompradorFormDefaults: Partial<DatosCompradorForm> = {
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

export const datosCompradorJuridicoDefaults = {
  certificadoExistencia: [],
  certificadoComposicion: [],
  copiaDocumento: [],
  poderJ: [],
};

export const datosCompradorNaturalDefaults = {
  compradorIds: [],
  estadoCivil: '',
  poderN: [],
};

export const documentosInmueblesFormDefaults: DocumentosInmueblesForm = {
  escritura881: [],
  linderosGenerales: [],
  pazYSalvo: [],
  valorOperacion: '',
};
