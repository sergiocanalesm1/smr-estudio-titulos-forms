import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextField, RadioGroup, FormControlLabel, Radio, Box, Container } from '@mui/material';
import FormSection from '../components/FormSection';
import DocumentUploader from '../components/DocumentUploader';
import InfoModal from '../components/InfoModal';
import { InternalFormInputs } from '../types';

const InternalForm: React.FC = () => {
  const navigate = useNavigate();
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleConfirmSubmit = () => {
    setDialogOpen(false);
    handleSubmit(onSubmit)();
  };

  const onSubmit: SubmitHandler<InternalFormInputs> = async (data) => {
    setLoading(true);

    // Create FormData and append non-file fields using snake_case keys
    const formData = new FormData();
    formData.append('case_id', data.caseID.trim());
    formData.append('comprador_name', data.compradorName);
    formData.append('comprador_email', data.compradorEmail.trim());
    formData.append('comprador_type', data.compradorType);
    formData.append('payment_value', data.paymentValue.replace(/,/g, '').trim());
    if (data.bancoHipoteca) {
      formData.append('banco_hipoteca', data.bancoHipoteca);
    }

    // Combine all file arrays and append each file under the same key "documents"
    const allFiles = [...data.approval, ...data.valuation, ...data.tradition];
    allFiles.forEach((file) => {
      formData.append('documents', file);
    });

    try {
      const response = await fetch(`https://${import.meta.env.VITE_GW_URL}/internal`, {
        method: 'POST',
        headers: {
          'x-api-key': import.meta.env.VITE_X_API_KEY
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Error: ${response.status}`);
      }

      await response.json();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(true);
    } finally {
      setLoading(false);
      navigate('/exito');
    }
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
        onSubmit={(e) => {
          e.preventDefault();
          setDialogOpen(true);
        }}
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
          <Controller
            name="compradorType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              const value = field.value ?? 'Natural';
              return (
                <RadioGroup row defaultChecked value={value} onChange={(e) => { field.onChange(e) }}>
                  <FormControlLabel value="Natural" control={<Radio />} label="Natural" />
                  <FormControlLabel value="Juridico" control={<Radio />} label="Jurídico" />
                </RadioGroup>
              )
            }}
          />
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
                transformedFileName="comprador_carta_de_aprobacion"
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
                transformedFileName="comprador_avaluo"
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
                transformedFileName="comprador_certificado_de_tradicion"
                multiple={true}
                error={!!errors.tradition}
                buttonLabel="Certificado de Tradición"
                helperText="Certificado de Tradición"
              />
            )}
          />
        </Box>
      </FormSection>
      <InfoModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        isError={error}
        title="Confirmación"
        message="¿Está seguro de que desea enviar el formulario?"
        onConfirm={handleConfirmSubmit}
      />
    </Container>
  );
};

export default InternalForm;
