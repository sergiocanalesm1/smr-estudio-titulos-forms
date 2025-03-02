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
  compradorIDs: [],
  poder: []
};

export const datosCompradorJuridicoDefaults = {
  certificadoExistencia: [],
  certificadoComposicion: [],
};

export const datosCompradorNaturalDefaults = {
  estadoCivil: '',
};

export const documentosInmueblesFormDefaults: DocumentosInmueblesForm = {
  escritura881: [],
  linderosGenerales: [],
  pazYSalvo: [],
  valorOperacion: '',
};
