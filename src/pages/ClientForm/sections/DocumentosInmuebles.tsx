

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Box } from '@mui/material';
import FormSection from '../../../components/FormSection';
import DocumentUploader from '../../../components/DocumentUploader';

export interface DocumentosInmueblesForm {
    escritura881: File[];
    linderosGenerales: File[];
    pazYSalvo: File[];
    valorOperacion: string;
}

const DocumentosInmuebles: React.FC = () => {
const {
    control,
    trigger,
    formState: { errors },
} = useFormContext();

const documentosErrors = errors?.documentosInmuebles as Partial<DocumentosInmueblesForm> | undefined;

const handleSectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger('documentosInmuebles');
    if (isValid) {
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
    >
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Escritura 881: Single file upload */}
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
            buttonLabel="Upload Escritura 881"
            helperText="Escritura pública 881 del 26 de abril de 2016 de la Notaría 30 de Bogotá con todos sus anexos."
            />
        )}
        />
        {/* Linderos Generales: Multiple file upload */}
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
            buttonLabel="Upload Linderos Generales"
            helperText="Primeras 10 hojas, parte pertinente de los linderos generales y especiales de los inmuebles negociados, cuadro de áreas y coeficientes completo y hoja de cierre con firma del Notario de la constitución del reglamento de propiedad horizontal."
            />
        )}
        />
        {/* Paz y Salvo: Multiple file upload */}
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
            buttonLabel="Upload Paz y Salvo"
            helperText="Paz y salvo del impuesto predial de los inmuebles correspondiente al año 2025."
            />
        )}
        />
        {/* Valor de la operación: Text field with positive number validation */}
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
              label="Valor de la Operación"
              value={field?.value || ''}
              onChange={(e) => {
                // Strip commas while typing
                const rawValue = e.target.value.replace(/,/g, '');
                field.onChange(rawValue);
              }}
              onBlur={(e) => {
                // On blur, if valid, format with commas
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

export default DocumentosInmuebles;
