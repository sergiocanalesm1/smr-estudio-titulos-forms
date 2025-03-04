

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Box } from '@mui/material';
import FormSection from '../../../components/FormSection';
import DocumentUploader from '../../../components/DocumentUploader';
import { InmueblesForm } from '../../../types';

interface InmueblesProps {
  validated: boolean;
  setValidated: (validated: boolean) => void;
}

const Inmuebles: React.FC<InmueblesProps> = ({ validated, setValidated }) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  const documentosErrors = errors?.documentosInmuebles as Partial<InmueblesForm> | undefined;

  const handleSectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger('documentosInmuebles');
    if (isValid) {
      setValidated(true);
      console.log('documentosInmuebles section is valid!');
    }
  };

  return (
    <FormSection
      title="Documentos de Inmuebles"
      description=""
      submitBtnText="Validar sección"
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
          name="documentosInmuebles.linderosGenerales"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DocumentUploader
              files={field.value}
              setFile={field.onChange}
              transformedFileName="linderosGenerales"
              multiple={true}
              error={!!documentosErrors?.linderosGenerales}
              buttonLabel="Linderos Generales"
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
              console.log('Valid number:', num);
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
      </Box>
    </FormSection>
  );
};

export default Inmuebles;
