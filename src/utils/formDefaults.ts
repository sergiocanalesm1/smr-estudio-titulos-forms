import { DatosCompradorForm } from "../pages/ClientForm/sections/DatosComprador";
import { DocumentosInmueblesForm } from "../pages/ClientForm/sections/DocumentosInmuebles";

export const datosCompradorFormDefaults: DatosCompradorForm = {
  nombreCliente: '',
  identificacion: '',
  direccion: '',
  email: '',
  tel: '',
  barrio: '',
  localidad: '',
  departamento: '',
  codigoPostal: '',
  rut: '',
  certificadosTradicion: '',
};

export const documentosInmueblesFormDefaults: DocumentosInmueblesForm = {
  escritura881: [],
  linderosGenerales: [],
  pazYSalvo: [],
  valorOperacion: '',
};