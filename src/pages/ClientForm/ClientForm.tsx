import React, { useEffect, useState } from 'react';
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

  const payload = queryParams.get('payload');
  const [params, setParams] = useState({
    caseID: '',
    compradorName: '',
    compradorEmail: '',
    compradorType: 'Natural',
    paymentValue: '0',
    bancoHipoteca: '',
    token: ''
  });

  const defaultValues = {
    datosComprador: datosCompradorFormDefaults,
    datosVendedor: datosVendedorFormDefaults,
    documentosInmuebles: documentosInmueblesFormDefaults,
    notaria: 'Notaria 38',
    soportePago: [],
  };

  const methods = useForm<ClientFormState>({ defaultValues });
  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (payload) {
      try {
        const decodedPayload = JSON.parse(atob(payload));
        setParams({
          caseID: decodedPayload.case_id ?? '',
          compradorName: decodedPayload.comprador_name ?? '',
          compradorEmail: decodedPayload.comprador_email ?? '',
          compradorType: decodedPayload.comprador_type as PersonType ?? 'Natural',
          paymentValue: decodedPayload.payment_value ?? '0',
          bancoHipoteca: decodedPayload.banco_hipoteca ?? '',
          token: decodedPayload.token
        });
      } catch (error) {
        console.error('Failed to decode payload:', error);
      }
    }
  }, [payload]);

  useEffect(() => {
    // prefill
    if (params.compradorName !== undefined && params.compradorEmail !== undefined) {
      setValue('datosComprador.nombreCliente', params.compradorName, { shouldTouch: true });
      setValue('datosComprador.email', params.compradorEmail, { shouldTouch: true});
    }
  }, [params, setValue])

  const [validatedSections, setValidatedSections] = useState<Record<keyof ClientFormState, boolean>>({
    datosComprador: false,
    datosVendedor: false,
    documentosInmuebles: false,
    notaria: false,
    soportePago: false,
  });

  const generatePDF = (data: ClientFormState): Blob => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    let yPosition = margin;
  
    doc.setFont('helvetica', 'bold');
    doc.text(params.caseID, 10, yPosition);
    yPosition += 20;
  
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDatos = (party: string, datos: any, xOffset = 0) => {
      if (yPosition + 10 > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(`${parseCamelCase(party)}`, 10 + xOffset, yPosition);
      doc.setFont('helvetica', 'normal');
      yPosition += 20;
  
      Object.entries(datos).forEach(([field, value]) => {
        if (typeof value === 'string') {
          doc.text(`${parseCamelCase(field)}: ${value}`, 10 + xOffset, yPosition);
          yPosition += 10;
        } else if (typeof value === 'object') {
          if (Object.values(value ?? {}).some(v => typeof v === 'string')) {
            handleDatos(field, value, xOffset + 10);
          }
        }
  
        if (yPosition + 10 > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
      });
  
      yPosition += 10;
    };
  
    handleDatos('Comprador', data.datosComprador);
    handleDatos('Inmuebles', data.documentosInmuebles);
    handleDatos('Vendedor', data.datosVendedor);
    handleDatos('Notaria', { notaria: data.notaria });
  
    const pdfBlob = doc.output('blob');
    doc.close();
    return pdfBlob;
  };

  const prepareFormData = (data: ClientFormState, pdfBlob: Blob): FormData => {
    const formData = new FormData();
    formData.append('case_id', params.caseID);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appendFiles = (datos: any) => {
      Object.values(datos).forEach(value => {
        if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
          const file = value[0];
          formData.append('documents', file);
        } else if (typeof value === 'object') {
          appendFiles(value);
        }
      });
    };
  
    appendFiles(data.datosComprador);
    appendFiles(data.documentosInmuebles);
    appendFiles(data.datosVendedor);
    appendFiles({ soportePago: data.soportePago });
  
    formData.append('documents', pdfBlob, 'datos.pdf');
    return formData;
  };
  
  const onSubmit = async (data: ClientFormState) => {
    const pdfBlob = generatePDF(data);
    const formData = prepareFormData(data, pdfBlob);
    try {
      const response = await fetch(`https://${import.meta.env.VITE_GW_URL}/client`, {
        method: 'POST',
        headers: {
          'x-api-key': params.token,
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Error: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Submission successful:', result);
      // Handle success (show success message, redirect, etc.)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (show error message to user)
    }
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
            - Al finalizar el formulario deberá adjuntar el comprobante del pago correspondiente a los honorarios. Las instrucciones detalladas para realizar este pago están incluidas claramente en la última sección del formulario.<br />
            - En caso de requerir documentos adicionales tras la revisión inicial, se le notificará vía correo electrónico.
          </Typography>
        </Paper>
        <Comprador personType={params.compradorType as PersonType} validated={validatedSections.datosComprador} setValidated={(v) => setValidated('datosComprador', v)} />
        <Inmuebles validated={validatedSections.documentosInmuebles} setValidated={(v) => setValidated('documentosInmuebles', v)} bancoHipoteca={params.bancoHipoteca} />
        <Vendedor validated={validatedSections.datosVendedor} setValidated={(v) => setValidated('datosVendedor', v)} />
        <Notaria validated={validatedSections.notaria} setValidated={(v) => setValidated('notaria', v)} />
        <Pago paymentValue={params.paymentValue!} validated={validatedSections.soportePago} setValidated={(v) => setValidated('soportePago', v)} />
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
