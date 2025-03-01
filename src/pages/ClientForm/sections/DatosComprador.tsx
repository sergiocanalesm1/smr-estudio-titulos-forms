import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Box } from '@mui/material';
import FormSection from '../../../components/FormSection';
import DocumentUploader from '../../../components/DocumentUploader';

export interface DatosCompradorForm extends DatosCompradorNatural, DatosCompradorJuridico {
  nombreCliente: string;//autofill
  email: string; //autofill
  identificacion: string;
  direccion: string;
  tel: string;
  barrio: string;
  localidad: string;
  departamento: string;
  codigoPostal: string;
  certificadosTradicion: string;
}
export interface DatosCompradorNatural {
  compradorIds: File[];
  estadoCivil: string;//dropdown?
  poderN: File[];//esto es file o string??
}

export interface DatosCompradorJuridico { 
  certificadoExistencia: File[];
  certificadoComposicion: File[];
  copiaDocumento: File[];
  poderJ: File[];
}

interface DatosCompradorProps {
  personType?: string;
}

const DatosComprador: React.FC<DatosCompradorProps> = ({personType}) => {
  const {
    control,
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const datosCompradorErrors = errors?.datosComprador as Partial<DatosCompradorForm> | undefined;

  const handleSectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger('datosComprador');
    if (isValid) {
      console.log('datosComprador section is valid!');
    }
  };

  const NaturalForm: React.FC = () => {
    return (
      <>
        <TextField
          label="Estado Civil"
          {...register('datosCompradorNatural.estadoCivil', { required: true })}
          error={!!datosCompradorErrors?.estadoCivil}
          variant="outlined"
        />
        <Controller
          name="datosCompradorNatural.compradorIds"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DocumentUploader
              files={field.value}
              setFile={field.onChange}
              transformedFileName="compradorIds"
              multiple={false}
              error={!!datosCompradorErrors?.compradorIds}
              buttonLabel="Documento(s) de identidad"
            />
          )}
        />
        <Controller
          name="datosCompradorNatural.poderN"
          control={control}
          render={({ field }) => (
            <DocumentUploader
              files={field.value}
              setFile={field.onChange}
              transformedFileName="poderN"
              multiple={false}
              error={!!datosCompradorErrors?.poderN}
              buttonLabel="Poder"
              helperText="Poder, en caso de que alguna de las partes actúe mediante apoderado."
            />
          )}
        />
      </>
    );
  }

  const JuridicoForm: React.FC = () => {
    return (
      <>
        <Controller
          name="datosCompradorJuridico.certificadoExistencia"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DocumentUploader
              files={field.value}
              setFile={field.onChange}
              transformedFileName="certificadoExistencia"
              multiple={false}
              error={!!datosCompradorErrors?.certificadoExistencia}
              buttonLabel="Certificado"
              helperText="Certificado de existencia y representación legal no mayor a 60 días."
            />
          )}
        />
        <Controller
          name="datosCompradorJuridico.certificadoComposicion"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DocumentUploader
              files={field.value}
              setFile={field.onChange}
              transformedFileName="certificadoComposicion"
              multiple={false}
              error={!!datosCompradorErrors?.certificadoComposicion}
              buttonLabel="Certificado"
              helperText="Certificado de composición accionaria no mayor a 60 días firmada por el representante legal o revisor fiscal, hasta llegar a la persona natural."
            />
          )}
        />
        <Controller
          name="datosCompradorJuridico.copiaDocumento"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DocumentUploader
              files={field.value}
              setFile={field.onChange}
              transformedFileName="copiaDocumento"
              multiple={false}
              error={!!datosCompradorErrors?.copiaDocumento}
              buttonLabel="Copia del documento de identidad"
            />
          )}
        />
        <Controller
          name="datosCompradorJuridico.poderJ"
          control={control}
          render={({ field }) => (
            <DocumentUploader
              files={field.value}
              setFile={field.onChange}
              transformedFileName="poderJ"
              multiple={false}
              error={!!datosCompradorErrors?.poderJ}
              buttonLabel="Poder"
              helperText="Poder, en caso de que alguna de las partes actúe mediante apoderado."
            />
          )}
        />
      </>
    );
  }

  return (
    <FormSection
      title="Datos Comprador"
      description="Proceso de facturación"
      submitBtnText="Validar sección"
      loading={false}
      onSubmit={handleSectionSubmit}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nombre del cliente"
          {...register('datosComprador.nombreCliente', { required: true })}
          error={!!datosCompradorErrors?.nombreCliente}
          variant="outlined"
        />
        <TextField
          label="Identificación"
          {...register('datosComprador.identificacion', { required: true })}
          error={!!datosCompradorErrors?.identificacion}
          variant="outlined"
        />
        <TextField
          label="Dirección"
          {...register('datosComprador.direccion', { required: true })}
          error={!!datosCompradorErrors?.direccion}
          helperText="En caso de estar fuera del país agradecemos poner una dirección de Colombia"
          variant="outlined"
        />
        <TextField
          label="E-mail"
          {...register('datosComprador.email', {
            required: true,
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
          })}
          error={!!datosCompradorErrors?.email}
          variant="outlined"
        />
        <TextField
          label="Tel"
          {...register('datosComprador.tel', { required: true })}
          error={!!datosCompradorErrors?.tel}
          variant="outlined"
        />
        <TextField
          label="Barrio"
          {...register('datosComprador.barrio', { required: true })}
          error={!!datosCompradorErrors?.barrio}
          variant="outlined"
        />
        <TextField
          label="Localidad"
          {...register('datosComprador.localidad', { required: true })}
          error={!!datosCompradorErrors?.localidad}
          variant="outlined"
        />
        <TextField
          label="Departamento"
          {...register('datosComprador.departamento', { required: true })}
          error={!!datosCompradorErrors?.departamento}
          variant="outlined"
        />
        <TextField
          label="Código postal"
          {...register('datosComprador.codigoPostal', { required: true })}
          error={!!datosCompradorErrors?.codigoPostal}
          variant="outlined"
        />
        <TextField
          label="Número de los certificados de tradición"
          {...register('datosComprador.certificadosTradicion', { required: true })}
          error={!!datosCompradorErrors?.certificadosTradicion}
          variant="outlined"
        />
        {personType === 'Natural' ? <NaturalForm /> : personType === 'Juridico' ? <JuridicoForm /> : null}
      </Box>
    </FormSection>
  );
};

export default DatosComprador;
