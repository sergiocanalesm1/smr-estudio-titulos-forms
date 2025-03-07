import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Container, Button, Box, Paper, Typography } from '@mui/material';
import { datosCompradorFormDefaults, documentosInmueblesFormDefaults, datosVendedorFormDefaults } from '../../utils/formDefaults';
import { ClientFormState, PersonType } from '../../types';
import Inmuebles from './sections/Inmuebles';
import Comprador from './sections/Comprador';
import Vendedor from './sections/Vendedor';
import Notaria from './sections/Notaria';
import Pago from './sections/Pago';
import Stepper from '../../components/Stepper';


const ClientForm: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const compradorType: PersonType = (queryParams.get('person_type') as PersonType) ?? 'Natural'; // assert
  const paymentValue = queryParams.get('payment_value') ?? '0'; // change

  const [validatedSections, setValidatedSections] = useState<Record<keyof ClientFormState, boolean>>({
    datosComprador: false,
    datosVendedor: false,
    inmuebles: false,
    notaria: false,
    soportePago: false,
  });

  const defaultValues = {
    datosComprador: datosCompradorFormDefaults,
    datosVendedor: datosVendedorFormDefaults,
    documentosInmuebles: documentosInmueblesFormDefaults,
    notaria: 'Notaria 38',
    soportePago: [],
  };

  const methods = useForm<ClientFormState>({ defaultValues });
  const { handleSubmit } = methods;

  const onSubmit = (data: ClientFormState) => {
    console.log('Final Form Data:', data);
  };

  const setValidated = (section: keyof typeof validatedSections, value: boolean) => {
    setValidatedSections((prev) => ({ ...prev, [section]: value }));
  };

  return (
    <Container sx={{ py: 2 }}>
      <Stepper validatedSections={validatedSections} onSubmit={handleSubmit(onSubmit)} />
      <FormProvider {...methods}>
        <Paper elevation={1} sx={{
          p: 4,
          borderRadius: 2,
          maxWidth: 600,
          margin: '0 auto',
          mb: 4,
        }}>
          <Typography variant="h4" gutterBottom>
            Estudio de Títulos SMR Abogados
          </Typography>
          <Typography variant="body1">
            En representación de la oficina del abogado externo asignado por Bancolombia para la
            elaboración de los estudios jurídicos y la constitución de las garantías para el crédito
            hipotecario, nos permitimos solicitarle la siguiente documentación:
          </Typography>
        </Paper>
        <Comprador personType={compradorType} validated={validatedSections.datosComprador} setValidated={(v) => setValidated('datosComprador', v)} />
        <Inmuebles validated={validatedSections.inmuebles} setValidated={(v) => setValidated('inmuebles', v)} />
        <Vendedor validated={validatedSections.datosVendedor} setValidated={(v) => setValidated('datosVendedor', v)} />
        <Notaria validated={validatedSections.notaria} setValidated={(v) => setValidated('notaria', v)} />
        <Pago paymentValue={paymentValue} validated={validatedSections.soportePago} setValidated={(v) => setValidated('soportePago', v)} />
        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <Button onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary">
            Enviar Formulario
          </Button>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default ClientForm;
