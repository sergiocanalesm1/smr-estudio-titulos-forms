import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, RadioGroup, FormControlLabel, Radio, Box, Container } from '@mui/material';
import FormSection from '../components/FormSection';
import DocumentUploader from '../components/DocumentUploader';
import { InternalFormInputs } from '../types';

const InternalForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InternalFormInputs>({
    defaultValues: {
      caseID: '',
      compradorName: '',
      compradorEmail: '',
      compradorType: 'Natural',
      paymentValue: '',
      bancoHipoteca: '',
      approval: [],
      valuation: [],
      tradition: [],
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<InternalFormInputs> = async (data) => {
    setLoading(true);
    // Create FormData and append non-file fields using snake_case keys.
    // For payment_value, remove commas.
    const formData = new FormData();
    formData.append('case_id', data.caseID);
    formData.append('comprador_name', data.compradorName);
    formData.append('comprador_email', data.compradorEmail);
    formData.append('comprador_type', data.compradorType);
    formData.append('payment_value', data.paymentValue.replace(/,/g, ''));
    formData.append('banco_hipoteca', data.bancoHipoteca); // optional

    // Combine all file arrays and append each file under the same key "documents"
    const allFiles = [...data.approval, ...data.valuation, ...data.tradition];
    allFiles.forEach((file) => {
      formData.append('documents', file);
    });

    try {
      const response = await fetch('https://et-internal-gateway-cid74lu6.uc.gateway.dev/submit', {
        method: 'POST',
        headers: {
          'x-api-key': import.meta.env.VITE_X_API_KEY
        },
        body: formData,
      })
      console.log(response);
    } catch (error) {
      console.error('Error logging FormData:', error);
    }
    setLoading(false);
  };

  return (
    <Container sx={{ py: 2 }}>
      <FormSection
        title="Contactar Cliente"
        description={`
          Este formulario le manda un correo al cliente solicitándole la información 
          requerida en otro formulario. Una vez se recibe la información, la carpeta quedará creada.
        `}
        submitBtnText="Enviar"
        loading={loading}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Caso ID"
            {...register('caseID', { required: true })}
            error={!!errors.caseID}
            variant="outlined"
          />
          <TextField
            label="Nombre Cliente"
            {...register('compradorName', { required: true })}
            error={!!errors.compradorName}
            variant="outlined"
          />
          <TextField
            label="Correo Cliente"
            {...register('compradorEmail', {
              required: true,
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
            error={!!errors.compradorEmail}
            helperText={errors.compradorEmail ? errors.compradorEmail.message : ''}
            variant="outlined"
          />
          <Box sx={{ p: 1 }}>
            <RadioGroup row {...register('compradorType', { required: true })} defaultChecked defaultValue="Natural">
              <FormControlLabel value="Natural" control={<Radio />} label="Natural" />
              <FormControlLabel value="Juridico" control={<Radio />} label="Jurídico" />
            </RadioGroup>
          </Box>
          {/* Payment Value: required, must be positive and ≤ 1,000,000; formatted with commas */}
          <Controller
            name="paymentValue"
            control={control}
            rules={{
              required: true,
              validate: (value) => {
                const rawValue = value.replace(/,/g, '');
                const num = Number(rawValue);
                if (isNaN(num)) return 'Inválido';
                if (num <= 0) return 'Inválido';
                if (num > 1000000) return 'Inválido';
                return true;
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Valor a Pagar"
                value={field.value}
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
          <TextField
            label="Banco Hipoteca"
            {...register('bancoHipoteca')}
            error={!!errors.compradorName}
            variant="outlined"
            helperText='Indicar el banco si el cliente tiene una hipoteca'
          />
          <Controller
            name="approval"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DocumentUploader
                files={field.value}
                setFile={(files: File[]) => field.onChange(files)}
                transformedFileName="carta_de_aprobacion"
                multiple={false}
                error={!!errors.approval}
                buttonLabel="Carta de Aprobación"
                helperText="Carta de Aprobación"
              />
            )}
          />
          <Controller
            name="valuation"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DocumentUploader
                files={field.value}
                setFile={(files: File[]) => field.onChange(files)}
                transformedFileName="avaluo"
                multiple={false}
                error={!!errors.valuation}
                buttonLabel="Avalúo"
                helperText="Avalúo"
              />
            )}
          />
          {/* Tradition: multiple file upload */}
          <Controller
            name="tradition"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DocumentUploader
                files={field.value}
                setFile={(files: File[]) => field.onChange(files)}
                transformedFileName="certificado_de_tradicion"
                multiple={true}
                error={!!errors.tradition}
                buttonLabel="Certificado de Tradición"
                helperText="Certificado de Tradición"
              />
            )}
          />
        </Box>
      </FormSection>
    </Container>
  );
};

export default InternalForm;
