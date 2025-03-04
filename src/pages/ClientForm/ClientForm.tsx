import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Container, Button, Box } from '@mui/material';
import { datosCompradorFormDefaults, documentosInmueblesFormDefaults, datosJuridicoDefaults, datosNaturalDefaults, datosVendedorFormDefaults } from '../../utils/formDefaults';
import { Paper, Typography } from '@mui/material';
import { DatosCompradorForm, DatosNatural, DatosJuridico, DatosVendedorForm, PersonType, InmueblesForm } from '../../types';
import Datos from './sections/Datos/Datos';
import Inmuebles from './sections/Inmuebles';

type ClientFormState = {
  datosComprador: DatosCompradorForm & (DatosNatural | DatosJuridico);
  datosVendedor: DatosVendedorForm & (DatosNatural | DatosJuridico);
  inmuebles: InmueblesForm;
};

const ClientForm: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const compradorType: PersonType = (queryParams.get('person_type') as PersonType) ?? 'Natural'; // assert

  const [vendedorType, setVendedorType] = useState<PersonType | undefined>();
  const [validatedSections, setValidatedSections] = useState<Record<keyof ClientFormState, boolean>>({
    datosComprador: false,
    datosVendedor: false,
    inmuebles: false,
  });

  const defaultValues = {
    datosComprador: {
      ...datosCompradorFormDefaults,
      ...(compradorType === 'Natural' ? datosNaturalDefaults : {}),
      ...(compradorType === 'Juridico' ? datosJuridicoDefaults : {}),
    },
    datosVendedor: {
      ...datosVendedorFormDefaults,
      ...(vendedorType === 'Natural' ? datosNaturalDefaults : {}),
      ...(vendedorType === 'Juridico' ? datosJuridicoDefaults : {}),
    },
    documentosInmuebles: documentosInmueblesFormDefaults,
  };

  const methods = useForm<ClientFormState>({
    defaultValues,
    // reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: ClientFormState) => {
    console.log('Final Form Data:', data);
  };

  const setValidated = (section: keyof typeof validatedSections, value: boolean) => {
    setValidatedSections((prev) => ({ ...prev, [section]: value }));
  };

  return (
    <Container sx={{ py: 2 }}>
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
        <Datos personType={compradorType} partyType='Comprador' validated={validatedSections.datosComprador} setValidated={(v) => setValidated('datosComprador', v)} />
        <Inmuebles validated={validatedSections.inmuebles} setValidated={(v) => setValidated('inmuebles', v)} />
        <Datos personType={vendedorType} partyType='Vendedor' partyCallback={setVendedorType} validated={validatedSections.datosVendedor} setValidated={(v) => setValidated('datosVendedor', v)} />
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
