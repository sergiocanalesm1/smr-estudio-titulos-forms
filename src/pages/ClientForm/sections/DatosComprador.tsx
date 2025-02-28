import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, Box } from '@mui/material';
import FormSection from '../../../components/FormSection';
export interface DatosCompradorForm {
  nombreCliente: string;
  identificacion: string;
  direccion: string;
  email: string;
  tel: string;
  barrio: string;
  localidad: string;
  departamento: string;
  codigoPostal: string;
  rut?: string;
  certificadosTradicion: string;
}

const DatosComprador: React.FC = () => {
  const {
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
        <TextField
          label="RUT (opcional)"
          {...register('datosComprador.rut')}
          error={!!datosCompradorErrors?.rut}
          variant="outlined"
        />
      </Box>
    </FormSection>
  );
};

export default DatosComprador;
