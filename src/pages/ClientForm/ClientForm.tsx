import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Container, Button, Box } from '@mui/material';
import DatosComprador, { DatosCompradorForm, DatosCompradorNatural, DatosCompradorJuridico } from './sections/DatosComprador';
import { datosCompradorFormDefaults, documentosInmueblesFormDefaults, datosCompradorJuridicoDefaults, datosCompradorNaturalDefaults } from '../../utils/formDefaults';
import DocumentosInmuebles, { DocumentosInmueblesForm } from './sections/DocumentosInmuebles';

type ClientFormState = {
  datosComprador: DatosCompradorForm & (DatosCompradorNatural | DatosCompradorJuridico);
  documentosInmuebles: DocumentosInmueblesForm;
};

const ClientForm: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const personType = queryParams.get('person_type') ?? 'Natural';

  const defaultValues = {
    datosComprador: {
      ...datosCompradorFormDefaults,
      ...(personType === 'Natural' ? datosCompradorNaturalDefaults : {}),
      ...(personType === 'Juridico' ? datosCompradorJuridicoDefaults : {}),
    },
    documentosInmuebles: documentosInmueblesFormDefaults,
  };

  const methods = useForm<ClientFormState>({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: ClientFormState) => {
    console.log('Final Form Data:', data);
  };

  return (
    <Container sx={{ py: 4 }}>
      <FormProvider {...methods}>
        <DatosComprador personType={personType} />
        <DocumentosInmuebles />
        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <Button onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default ClientForm;
