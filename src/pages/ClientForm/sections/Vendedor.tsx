import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import { PersonType } from '../../../types';
import FormSection from '../../../components/FormSection';
import DocumentUploader from '../../../components/DocumentUploader';
import { sectionNames } from '../../../utils/constants';

interface VendedorProps {
    validated: boolean;
    setValidated: (value: boolean) => void;
    personType?: PersonType;
    setPersonType: (type: PersonType) => void;
}

const Vendedor: React.FC<VendedorProps> = ({ validated, setValidated, personType, setPersonType }) => {
    const {
        control,
        register,
        trigger,
        formState,
    } = useFormContext();


    const e = formState.errors.datosVendedor as any;

    const handleSectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = await trigger(`datosVendedor`);
        if (isValid) {
            console.log("datosVendedor section is valid!");
            setValidated(true);
        }
    };

    const ChoosePersonType: React.FC = () => (
        <Box sx={{ p: 1 }}>
            <RadioGroup row value={personType} onChange={(e) => setPersonType(e.target.value as PersonType)}>
                <FormControlLabel value="Natural" control={<Radio />} label="Natural" />
                <FormControlLabel value="Juridico" control={<Radio />} label="Jurídico" />
            </RadioGroup>
        </Box>
    )

    const NaturalFields: React.FC = () => (
        <TextField
            label="Estado Civil"
            {...register('datosVendedor.estadoCivil', { required: true })}
            error={!!e?.estadoCivil}
            variant="outlined"
        />
    );

    const JuridicoFields: React.FC = () => (
        <>
            <Controller
                name="datosVendedor.certificadoExistencia"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <DocumentUploader
                        files={field.value}
                        setFile={field.onChange}
                        transformedFileName="certificadoExistencia"
                        error={!!e?.certificadoExistencia}
                        buttonLabel="Certificado"
                        helperText="Certificado de existencia y representación legal no mayor a 60 días."
                    />
                )}
            />
            <Controller
                name="datosVendedor.certificadoComposicion"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <DocumentUploader
                        files={field.value}
                        setFile={field.onChange}
                        transformedFileName="certificadoComposicion"
                        error={!!e?.certificadoComposicion}
                        buttonLabel="Certificado"
                        helperText="Certificado de composición accionaria no mayor a 60 días firmada por el representante legal o revisor fiscal, hasta llegar a la persona natural."
                    />
                )}
            />
        </>

    );

    return (
        <FormSection
            title={sectionNames.datosVendedor}
            submitBtnText="Completar Sección"
            loading={false}
            onSubmit={handleSectionSubmit}
            done={validated}
            setDone={setValidated}
        >
            <ChoosePersonType />
            {!!personType &&
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {personType === 'Natural' ? <NaturalFields /> : personType === 'Juridico' ? <JuridicoFields /> : null}
                    <Controller
                        name="datosVendedor.ids"
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
                        name="datosVendedor.poder"
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

export default Vendedor;
