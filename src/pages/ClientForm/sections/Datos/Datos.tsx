import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import FormSection from '../../../../components/FormSection';
import DocumentUploader from '../../../../components/DocumentUploader';
import type { PartyType, PersonType } from '../../../../types';
import { CompradorFields } from './fields/Comprador';
import { NaturalFields } from './fields/Natural';
import { JuridicoFields } from './fields/Juridico';
// TODO
// autofill nombreCliente y email

interface DatosProps {
  validated: boolean;
  setValidated: (value: boolean) => void;
  partyType: PartyType;
  personType?: PersonType;
  partyCallback?: (type: PersonType) => void;
}

const Datos: React.FC<DatosProps> = ({ validated, setValidated, personType, partyType, partyCallback = () => { } }) => {
  const {
    control,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  const e = errors[`datos${partyType}`] as any;

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(`watching ${name} of type ${type} with value:`, value)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  const handleSectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger(`datos${partyType}`);
    if (isValid) {
      console.log(`datos${partyType} section is valid!`);
      setValidated(true);
    }
  };

  const VendedorRadioGroup: React.FC = () => (
    <Box sx={{ p: 1 }}>
      <RadioGroup row value={personType} onChange={(e) => partyCallback(e.target.value as PersonType)}>
        <FormControlLabel value="Natural" control={<Radio />} label="Natural" />
        <FormControlLabel value="Juridico" control={<Radio />} label="Jurídico" />
      </RadioGroup>
    </Box>
  )

  return (
    <FormSection
      title={`Datos ${partyType}`}
      submitBtnText="Validar sección"
      loading={false}
      onSubmit={handleSectionSubmit}
      done={validated}
    >
      {partyType === 'Vendedor' && <VendedorRadioGroup />}
      {!!personType &&
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {partyType === 'Comprador' && <CompradorFields />}
          {personType === 'Natural' ? <NaturalFields partyType={partyType} /> : personType === 'Juridico' ? <JuridicoFields partyType={partyType} /> : null}
          <Controller
            name={`datos${partyType}.ids`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DocumentUploader
                files={field.value}
                setFile={field.onChange}
                transformedFileName="identificacion"
                error={!!e?.ids}
                buttonLabel="Documento de Identidad"
                helperText={personType === 'Natural'
                  ? 'Copia del documento de identidad del o los titulares del crédito'
                  : 'Documento de identidad del representante legal'
                }
              />
            )}
          />
          <Controller
            name={`datos${partyType}.poder`}
            control={control}
            render={({ field }) => (
              <DocumentUploader
                files={field.value}
                setFile={field.onChange}
                transformedFileName="poder"
                error={!!e?.poder}
                buttonLabel="Poder"
                helperText="Poder, en caso de que alguna de las partes actúe mediante apoderado."
              />
            )}
          />
        </Box>
      }
    </FormSection>
  );
};

export default Datos;
