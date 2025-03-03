import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Container, Button, Box } from '@mui/material';
import DatosAgente, { DatosCompradorForm, DatosNatural, DatosJuridico, DatosVendedorForm } from './sections/DatosAgente';
import { datosCompradorFormDefaults, documentosInmueblesFormDefaults, datosJuridicoDefaults, datosNaturalDefaults } from '../../utils/formDefaults';
import DocumentosInmuebles, { DocumentosInmueblesForm } from './sections/DocumentosInmuebles';
// create file for types
type ClientFormState = {
  datosComprador: DatosCompradorForm & (DatosNatural | DatosJuridico);
  datosVendedor: DatosVendedorForm & (DatosNatural | DatosJuridico);
  documentosInmuebles: DocumentosInmueblesForm;
};

type PersonType = 'Natural' | 'Juridico';

const ClientForm: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const compradorType: PersonType = (queryParams.get('person_type') as PersonType) ?? 'Natural'; // assert

  const [vendedorType, setVendedorType] = useState<PersonType | undefined>();

  const defaultValues = {
    datosComprador: {
      ...datosCompradorFormDefaults,
      ...(compradorType === 'Natural' ? datosNaturalDefaults : {}),
      ...(compradorType === 'Juridico' ? datosJuridicoDefaults : {}),
    },
    datosVendedor: {
      ...datosCompradorFormDefaults,
      ...(vendedorType === 'Natural' ? datosNaturalDefaults : {}),
      ...(vendedorType === 'Juridico' ? datosJuridicoDefaults : {}),
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
        <DatosAgente personType={compradorType} partyType='Comprador' />
        <DocumentosInmuebles />
        <DatosAgente personType={vendedorType} partyType='Vendedor' partyCallback={setVendedorType} />
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
