import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Container, Button, Box } from '@mui/material';
import DatosComprador, { DatosCompradorForm } from './sections/DatosComprador';
import { datosCompradorFormDefaults, documentosInmueblesFormDefaults } from '../../utils/formDefaults';
import DocumentosInmuebles, { DocumentosInmueblesForm } from './sections/DocumentosInmuebles';

interface ClientFormState {
  datosComprador: DatosCompradorForm;
  documentosInmuebles: DocumentosInmueblesForm;
}

const ClientForm: React.FC = () => {
  const methods = useForm<ClientFormState>({
    defaultValues: {
        datosComprador: datosCompradorFormDefaults,
        documentosInmuebles: documentosInmueblesFormDefaults
      },
    }
  );

  const { handleSubmit } = methods;

  const onSubmit = (data: ClientFormState) => {
    console.log('Final Form Data:', data);
  };

  return (
    <Container sx={{ py: 4 }}>
      <FormProvider {...methods}>
        <DatosComprador />
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
