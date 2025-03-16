

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Box, Typography } from '@mui/material';
import FormSection from '../../../components/FormSection';
import DocumentUploader from '../../../components/DocumentUploader';
import { InmueblesForm } from '../../../types';
import { sectionNames } from '../../../utils/constants';

interface InmueblesProps {
  validated: boolean;
  setValidated: (validated: boolean) => void;
  bancoHipoteca?: string;
}

const Inmuebles: React.FC<InmueblesProps> = ({ validated, setValidated, bancoHipoteca }) => {
  const {
    control,
    trigger,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const documentosErrors = errors?.documentosInmuebles as Partial<InmueblesForm> | undefined;

  const handleSectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger('documentosInmuebles');
    if (isValid) {
      if (bancoHipoteca) {
        setValue('documentosInmuebles.hipoteca.banco', bancoHipoteca)
      }
      setValidated(true);
      console.log('documentosInmuebles section is valid!');
    }
  };

  const HipotecaSection: React.FC = () => (
    <>
      <Typography>
        Por favor adjuntar la siguiente documentación para la hipoteca del banco {bancoHipoteca}
      </Typography>
      <Controller
        name="documentosInmuebles.hipoteca.id"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <DocumentUploader
            files={field.value}
            setFile={field.onChange}
            transformedFileName="hipoteca_id"
            multiple={false}
            error={!!documentosErrors?.hipoteca?.id}
            buttonLabel="Hipoteca"
            helperText="La identificación del crédito hipotecario allí existente, con su saldo actual y si está al día, y el inmueble objeto de la garantía."
          />
        )}
      />
      <TextField // multiline with placeholder?
        multiline
        label="Manifestación de pago"
        {...register("documentosInmuebles.hipoteca.manifestacionPago", { required: true })}
        error={!!documentosErrors?.hipoteca?.manifestacionPago}
        helperText="Manifestación de que se obligan a cancelar la hipoteca una vez se les pague el crédito hipotecario."
        variant="outlined"
      />
      <TextField // multiline with placeholder?
        multiline
        label="Manifestación del cliente"
        {...register("documentosInmuebles.hipoteca.manifestacionCliente", { required: true })}
        error={!!documentosErrors?.hipoteca?.manifestacionCliente}
        helperText="Manifestación expresa de que el cliente no tiene otros productos de crédito atados a la garantía hipotecaria."
        variant="outlined"
      />
    </>
  )

  return (
    <FormSection
      title={sectionNames.documentosInmuebles}
      description=""
      submitBtnText="Validar Sección"
      loading={false}
      onSubmit={handleSectionSubmit}
      done={validated}
      setDone={setValidated}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          name="documentosInmuebles.escritura881"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DocumentUploader
              files={field.value}
              setFile={field.onChange}
              transformedFileName="escritura881"
              multiple={false}
              error={!!documentosErrors?.escritura881}
              buttonLabel="Escritura 881"
              helperText="Escritura pública 881 del 26 de abril de 2016 de la Notaría 30 de Bogotá con todos sus anexos."
            />
          )}
        />
        <Controller
          name="documentosInmuebles.linderos"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DocumentUploader
              files={field.value}
              setFile={field.onChange}
              transformedFileName="linderos"
              multiple={true}
              error={!!documentosErrors?.linderos}
              buttonLabel="Linderos"
              helperText="Primeras 10 hojas, parte pertinente de los linderos generales y especiales de los inmuebles negociados, cuadro de áreas y coeficientes completo y hoja de cierre con firma del Notario de la constitución del reglamento de propiedad horizontal."
            />
          )}
        />
        <Controller
          name="documentosInmuebles.pazYSalvo"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DocumentUploader
              files={field.value}
              setFile={field.onChange}
              transformedFileName="pazYSalvo"
              multiple={true}
              error={!!documentosErrors?.pazYSalvo}
              buttonLabel="Paz y Salvo"
              helperText="Paz y salvo del impuesto predial de los inmuebles correspondiente al año 2025."
            />
          )}
        />
        <Controller
          name="documentosInmuebles.valorOperacion"
          control={control}
          rules={{
            required: true,
            validate: (value) => {
              const rawValue = value.replace(/,/g, '');
              const num = Number(rawValue);
              if (isNaN(num)) return 'No válido';
              if (num <= 0) return 'Debe ser positivo';
              return true;
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Valor de la Compraventa"
              value={field?.value || ''}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, '');
                field.onChange(rawValue);
              }}
              onBlur={(e) => {
                const rawValue = e.target.value.replace(/,/g, '');
                const num = Number(rawValue);
                if (!isNaN(num) && rawValue !== '') {
                  field.onChange(new Intl.NumberFormat('en-US').format(num));
                }
                field.onBlur();
              }}
              error={!!error}
              helperText={error ? error.message : ''}
              variant="outlined"
            />
          )}
        />
        {bancoHipoteca && <HipotecaSection />}
      </Box>
    </FormSection>
  );
};

export default Inmuebles;
