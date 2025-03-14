import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import { Container, Button, Box, Paper, Typography } from '@mui/material';

import { datosCompradorFormDefaults, documentosInmueblesFormDefaults, datosVendedorFormDefaults } from '../../utils/formDefaults';
import { ClientFormState, PersonType } from '../../types';
import Inmuebles from './sections/Inmuebles';
import Comprador from './sections/Comprador';
import Vendedor from './sections/Vendedor';
import Notaria from './sections/Notaria';
import Pago from './sections/Pago';
import Stepper from '../../components/Stepper';
import { parseCamelCase } from '../../utils/utils';


const ClientForm: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const compradorType: PersonType = (queryParams.get('person_type') as PersonType) ?? 'Natural'; // assert
  const paymentValue = queryParams.get('payment_value') ?? '0'; // change

  const [validatedSections, setValidatedSections] = useState<Record<keyof ClientFormState, boolean>>({
    datosComprador: false,
    datosVendedor: false,
    documentosInmuebles: false,
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
    // validate all sections and set state
    console.log('Final Form Data:', data);
    const formData = new FormData();
    const doc = new jsPDF();
    let yPosition = 20;

    const handleDatos = (party: string, datos: any) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${party}`, 10, yPosition);
      doc.setFont('helvetica', 'normal');
      yPosition += 20;

      // Loop over each form field and add text to the PDF
      Object.entries(datos).forEach(([field, value]) => {
        // if value is a string
        if (typeof value === 'string') {
          doc.text(`${parseCamelCase(field)}: ${value}`, 10, yPosition);
          yPosition += 10; // move down for the next field
        }
        else if (Array.isArray(value) && value.length > 0) {
          formData.append(`${party}_${value[0].name}`, value[0]);
        }
      });

      yPosition += 10;
    }

    handleDatos('Comprador', data.datosComprador);
    handleDatos('Inmuebles', data.documentosInmuebles);
    handleDatos('Vendedor', data.datosVendedor);
    handleDatos('Notaria', { notaria: data.notaria });

    // Convert the PDF document to a blob
    const pdfBlob = doc.output('blob');
    formData.append(`Datos`, pdfBlob, `datos.pdf`);
    doc.close();

    console.log('formdata')
    formData.forEach((value, key) => {
      console.log(key, value);
    });
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
          <Typography variant="body2">
            En representación de la oficina del abogado externo asignado por Bancolombia para la elaboración de los estudios jurídicos y la constitución de garantías relacionadas con su crédito hipotecario, le solicitamos diligenciar el siguiente formulario y adjuntar toda la documentación requerida.
            <br /><br />
            ⚠ Lea cuidadosamente antes de comenzar:
            <br /><br />
            - Todos los documentos solicitados deben adjuntarse en formato PDF.<br />
            - Verifique que los documentos estén completos y legibles antes de enviarlos. La documentación incompleta generará retrasos significativos en el trámite.<br />
            - Al finalizar el formulario deberá adjuntar el comprobante del pago correspondiente a los honorarios legales. Las instrucciones detalladas para realizar este pago están incluidas claramente en la última sección del formulario.<br />
            - En caso de requerir documentos adicionales tras la revisión inicial, se le notificará vía correo electrónico.
          </Typography>
        </Paper>
        <Comprador personType={compradorType} validated={validatedSections.datosComprador} setValidated={(v) => setValidated('datosComprador', v)} />
        <Inmuebles validated={validatedSections.documentosInmuebles} setValidated={(v) => setValidated('documentosInmuebles', v)} />
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
