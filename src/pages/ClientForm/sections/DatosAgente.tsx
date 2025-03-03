import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import FormSection from '../../../components/FormSection';
import DocumentUploader from '../../../components/DocumentUploader';
// TODO
// autofill nombreCliente y email
export interface DatosCompradorForm extends DatosNatural, DatosJuridico {
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

export type DatosVendedorForm = DatosNatural & DatosJuridico;

export interface Datos {
  ids: File[];
  poder: File[];
}
export interface DatosNatural extends Datos {
  estadoCivil: string;//dropdown?
}

export interface DatosJuridico extends Datos {
  certificadoExistencia: File[];
  certificadoComposicion: File[];
}

interface DatosCompradorProps {
  partyType: 'Comprador' | 'Vendedor';
  personType?: 'Natural' | 'Juridico';
  partyCallback?: (type: 'Natural' | 'Juridico') => void;
}

const DatosAgente: React.FC<DatosCompradorProps> = ({ personType, partyType, partyCallback = () => { } }) => {
  const {
    control,
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const datosErrors: Partial<DatosVendedorForm> | Partial<DatosCompradorForm> | undefined = partyType === 'Vendedor'
    ? (errors?.datosVendedor as Partial<DatosVendedorForm> | undefined)
    : (errors?.datosComprador as Partial<DatosCompradorForm> | undefined);

  const handleSectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger(`datos${partyType}`);
    if (isValid) {
      console.log(`datos${partyType} section is valid!`);
    }
  };

  const CompradorFields: React.FC = () => (
    <>
      <TextField
        label="Nombre del cliente"
        {...register('datosComprador.nombreCliente', { required: true })}
        error={!!(datosErrors as DatosCompradorForm)?.nombreCliente}
        variant="outlined"
      />
      <TextField
        label="E-mail"
        {...register('datosComprador.email', {
          required: true,
          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
        })}
        error={!!(datosErrors as DatosCompradorForm)?.email}
        variant="outlined"
      />
      <TextField
        label="Identificación"
        {...register('datosComprador.identificacion', { required: true })}
        error={!!(datosErrors as DatosCompradorForm)?.identificacion}
        variant="outlined"
      />
      <TextField
        label="Dirección"
        {...register('datosComprador.direccion', { required: true })}
        error={!!(datosErrors as DatosCompradorForm)?.direccion}
        helperText="En caso de estar fuera del país agradecemos poner una dirección de Colombia"
        variant="outlined"
      />
      <TextField
        label="Teléfono"
        {...register('datosComprador.tel', {
          required: true,
          pattern: { value: /^[+\d]+$/, message: 'Debe ser un número válido' },
        })}
        error={!!(datosErrors as DatosCompradorForm)?.tel}
        helperText={!!(datosErrors as DatosCompradorForm)?.tel ? 'Debe ser un número válido' : ''}
        variant="outlined"
      />
      <TextField
        label="Barrio"
        {...register('datosComprador.barrio', { required: true })}
        error={!!(datosErrors as DatosCompradorForm)?.barrio}
        variant="outlined"
      />
      <TextField
        label="Localidad"
        {...register('datosComprador.localidad', { required: true })}
        error={!!(datosErrors as DatosCompradorForm)?.localidad}
        variant="outlined"
      />
      <TextField
        label="Departamento"
        {...register('datosComprador.departamento', { required: true })}
        error={!!(datosErrors as DatosCompradorForm)?.departamento}
        variant="outlined"
      />
      <TextField
        label="Código postal"
        {...register('datosComprador.codigoPostal', { required: true })}
        error={!!(datosErrors as DatosCompradorForm)?.codigoPostal}
        variant="outlined"
      />
      <TextField
        label="Número de los certificados de tradición"
        {...register('datosComprador.certificadosTradicion', { required: true })}
        error={!!(datosErrors as DatosCompradorForm)?.certificadosTradicion}
        variant="outlined"
      />
    </>
  );

  const NaturalFields: React.FC = () => (
    <TextField
      label="Estado Civil"
      {...register(`datos${partyType}.estadoCivil`, { required: true })}
      error={!!datosErrors?.estadoCivil}
      variant="outlined"
    />
  );

  const JuridicoFields: React.FC = () => (
    <>
      <Controller
        name={`datos${partyType}.certificadoExistencia`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <DocumentUploader
            files={field.value}
            setFile={field.onChange}
            transformedFileName="certificadoExistencia"
            error={!!datosErrors?.certificadoExistencia}
            buttonLabel="Certificado"
            helperText="Certificado de existencia y representación legal no mayor a 60 días."
          />
        )}
      />
      <Controller
        name={`datos${partyType}.certificadoComposicion`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <DocumentUploader
            files={field.value}
            setFile={field.onChange}
            transformedFileName="certificadoComposicion"
            error={!!datosErrors?.certificadoComposicion}
            buttonLabel="Certificado"
            helperText="Certificado de composición accionaria no mayor a 60 días firmada por el representante legal o revisor fiscal, hasta llegar a la persona natural."
          />
        )}
      />
    </>
  );


  const VendedorRadioGroup: React.FC = () => (
    <Box sx={{ p: 1 }}>
      <RadioGroup row value={personType} onChange={(e) => partyCallback(e.target.value as 'Natural' | 'Juridico')}>
        <FormControlLabel value="Natural" control={<Radio />} label="Natural" />
        <FormControlLabel value="Juridico" control={<Radio />} label="Jurídico" />
      </RadioGroup>
    </Box>
  )

  console.log()

  return (
    <FormSection
      title={`Datos ${partyType}`}
      submitBtnText="Validar sección"
      loading={false}
      onSubmit={handleSectionSubmit}
    >
      {partyType === 'Vendedor' && <VendedorRadioGroup />}
      {!!personType &&
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {partyType === 'Comprador' && <CompradorFields />}
          {personType === 'Natural' ? <NaturalFields /> : personType === 'Juridico' ? <JuridicoFields /> : null}
          <Controller
            name={`datos${partyType}.ids`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DocumentUploader
                files={field.value}
                setFile={field.onChange}
                transformedFileName="identificacion"
                error={!!datosErrors?.ids}
                buttonLabel="Documento de Identidad"
                helperText={personType === 'Natural'
                  ? 'Copia del documento de identidad del o los titulares del crédito'
                  : 'Documento de identidad del representante legal'
                }
              />
            )}
          />
          <Controller
            name={`datos${partyType}.poder`}
            control={control}
            render={({ field }) => (
              <DocumentUploader
                files={field.value}
                setFile={field.onChange}
                transformedFileName="poder"
                error={!!datosErrors?.poder}
                buttonLabel="Poder"
                helperText="Poder, en caso de que alguna de las partes actúe mediante apoderado."
              />
            )}
          />
        </Box>
      }
    </FormSection>
  );
};

export default DatosAgente;
