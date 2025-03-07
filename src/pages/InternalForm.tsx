import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import FormSection from '../components/FormSection';
import DocumentUploader from '../components/DocumentUploader';

type PersonType = 'Natural' | 'Legal';

interface InternalFormInputs {
  caseID: string;
  clientName: string;
  clientEmail: string;
  personType: PersonType;
  paymentValue: string;
  approval: File[];
  valuation: File[];
  tradition: File[];
}

const InternalForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InternalFormInputs>({
    defaultValues: {
      caseID: '',
      clientName: '',
      clientEmail: '',
      personType: 'Natural',
      paymentValue: '',
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
    formData.append('caso_id', data.caseID);
    formData.append('name', data.clientName);
    formData.append('email', data.clientEmail);
    formData.append('person_type', data.personType);
    formData.append('payment_value', data.paymentValue.replace(/,/g, ''));

    // Combine all file arrays and append each file under the same key "documents"
    const allFiles = [...data.approval, ...data.valuation, ...data.tradition];
    allFiles.forEach((file) => {
      formData.append('documents', file);
    });

    // try {
    //   const response = await fetch('https://smr-internal-form-submission-892018225870.us-central1.run.app', {
    //     method: 'POST',
    //     body: formData,
    //   })
    //   console.log(response);
    // } catch (error) {
    //   console.error('Error logging FormData:', error);
    // }
    setLoading(false);
  };

  return (
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
        {/* Case ID: required; error indicated only by red outline */}
        <TextField
          label="Caso ID"
          {...register('caseID', { required: true })}
          error={!!errors.caseID}
          variant="outlined"
        />
        {/* Client Name: required; error indicated only by red outline */}
        <TextField
          label="Nombre Cliente"
          {...register('clientName', { required: true })}
          error={!!errors.clientName}
          variant="outlined"
        />
        {/* Client Email: required, with error text on invalid entry */}
        <TextField
          label="Correo Cliente"
          {...register('clientEmail', {
            required: true,
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
          })}
          error={!!errors.clientEmail}
          helperText={errors.clientEmail ? errors.clientEmail.message : ''}
          variant="outlined"
        />
        {/* Person Type: radio buttons defaulting to "Natural" */}
        <Box sx={{ p: 1 }}>
          <RadioGroup row {...register('personType', { required: true })} defaultChecked defaultValue="Natural">
            <FormControlLabel value="Natural" control={<Radio />} label="Natural" />
            <FormControlLabel value="Legal" control={<Radio />} label="Legal" />
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
              if (isNaN(num)) return 'Invalid number';
              if (num <= 0) return 'Must be positive';
              if (num > 1000000) return 'Must be no larger than 1000000';
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
  );
};

export default InternalForm;
