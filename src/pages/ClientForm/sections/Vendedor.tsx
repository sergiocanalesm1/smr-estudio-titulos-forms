import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, RadioGroup, FormControlLabel, Radio, TextField, Typography } from '@mui/material';
import FormSection from '../../../components/FormSection';
import DocumentUploader from '../../../components/DocumentUploader';
import { sectionNames } from '../../../utils/constants';

interface VendedorProps {
    validated: boolean;
    setValidated: (value: boolean) => void;
}

const Vendedor: React.FC<VendedorProps> = ({ validated, setValidated }) => {
    const {
        control,
        register,
        trigger,
        formState,
        watch,
    } = useFormContext();
    const [withPoder, setWithPoder] = React.useState<boolean>(false);

    const e = formState.errors.datosVendedor as any;
    const personType = watch('datosVendedor.tipo');

    const handleSectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = await trigger(`datosVendedor`);
        if (isValid) {
            console.log("datosVendedor section is valid!");
            setValidated(true);
        }
    };

    const ChoosePersonType: React.FC = () => (
        <Controller
            name="datosVendedor.tipo"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
                <RadioGroup row value={field.value} onChange={(e) => { field.onChange(e) }}>
                    <FormControlLabel value="Natural" control={<Radio />} label="Natural" />
                    <FormControlLabel value="Juridico" control={<Radio />} label="Jurídico" />
                </RadioGroup>
            )}
        />
    )

    const PoderOptional: React.FC = () => (
        <>
            <Typography>¿Alguna de las partes actúa mediante apoderado?</Typography>
            <RadioGroup
                row
                value={withPoder}
                defaultChecked
                onChange={(e) => setWithPoder(e.target.value === 'true')}>
                <FormControlLabel value={true} control={<Radio />} label="Sí" />
                <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
        </>
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
            submitBtnText="Validar Sección"
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
                    <PoderOptional />
                    {withPoder &&
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
                    }
                </Box>
            }
        </FormSection>
    );
};

export default Vendedor;
