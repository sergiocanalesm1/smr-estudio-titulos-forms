import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { DatosCompradorForm, DatosJuridico, DatosNatural, PersonType } from '../../../types';
import FormSection from '../../../components/FormSection';
import DocumentUploader from '../../../components/DocumentUploader';
import { sectionNames } from '../../../utils/constants';
// TODO
// autofill nombreCliente y email

interface CompradorProps {
    validated: boolean;
    setValidated: (value: boolean) => void;
    personType?: PersonType;
}

const Comprador: React.FC<CompradorProps> = ({ validated, setValidated, personType }) => {
    const {
        control,
        register,
        trigger,
        formState,
    } = useFormContext();
    const [withPoder, setWithPoder] = React.useState<boolean>(false);

    const e = formState.errors?.datosComprador as Partial<DatosCompradorForm> | undefined;

    const handleSectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = await trigger(`datosComprador`);
        if (isValid) {
            console.log(`datosComprador section is valid!`);
            setValidated(true);
        }
    };

    const NaturalFields: React.FC = () => (
        <TextField
            label="Estado Civil"
            {...register('datosComprador.estadoCivil', { required: true })}
            error={!!(e as Partial<DatosCompradorForm & DatosNatural>)?.estadoCivil}
            variant="outlined"
        />
    );

    const JuridicoFields: React.FC = () => (
        <>
            <Controller
                name="datosComprador.certificadoExistencia"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <DocumentUploader
                        files={field.value}
                        setFile={field.onChange}
                        transformedFileName="comprador_certificado_existencia"
                        error={!!(e as Partial<DatosCompradorForm & DatosJuridico>)?.certificadoExistencia}
                        buttonLabel="Certificado"
                        helperText="Certificado de existencia y representación legal no mayor a 60 días."
                    />
                )}
            />
            <Controller
                name="datosComprador.certificadoComposicion"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <DocumentUploader
                        files={field.value}
                        setFile={field.onChange}
                        transformedFileName="comprador_certificado_composicion"
                        error={!!(e as Partial<DatosCompradorForm & DatosJuridico>)?.certificadoComposicion}
                        buttonLabel="Certificado"
                        helperText="Certificado de composición accionaria no mayor a 60 días firmada por el representante legal o revisor fiscal, hasta llegar a la persona natural."
                    />
                )}
            />
        </>

    );

    const PoderOptional: React.FC = () => (
        <>
            <Typography>¿Actúa mediante apoderado?</Typography>
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

    const IdBox: React.FC = () => (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Controller
                name="datosComprador.identificacion.tipo"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <Select
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                        sx={{ flex: '0 1 min-content' }}
                    >
                        <MenuItem value='CC'>CC</MenuItem>
                        <MenuItem value='NIT'>NIT</MenuItem>
                        <MenuItem value='Pasaporte'>Pasaporte</MenuItem>
                    </Select>
                )}
            />
            <TextField
                label="Identificación"
                {...register('datosComprador.identificacion.numero', { required: true })}
                error={!!e?.identificacion?.numero}
                variant="outlined"
                sx={{ flex: '1 1 auto' }}
            />
        </Box>
    );

    return (
        <FormSection
            title={sectionNames.datosComprador}
            submitBtnText="Validar Sección"
            loading={false}
            onSubmit={handleSectionSubmit}
            done={validated}
            setDone={setValidated}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    {...register('datosComprador.nombreCliente', { required: true })}
                    variant='standard'
                    slotProps={{
                        input: {
                            readOnly: true,
                        }
                    }}
                />
                <TextField
                    {...register('datosComprador.email', { required: true })}
                    variant='standard'
                    slotProps={{
                        input: {
                            readOnly: true,
                        }
                    }}
                />
                <IdBox />
                <TextField
                    label="Dirección"
                    {...register('datosComprador.direccion', { required: true })}
                    error={!!e?.direccion}
                    helperText="En caso de estar fuera del país agradecemos poner una dirección de Colombia"
                    variant="outlined"
                />
                <TextField
                    label="Teléfono"
                    {...register('datosComprador.tel', {
                        required: true,
                        pattern: { value: /^[+\d]+$/, message: 'Debe ser un número válido' },
                    })}
                    error={!!e?.tel}
                    helperText={e?.tel ? 'Debe ser un número válido' : ''}
                    variant="outlined"
                />
                <TextField
                    label="Ciudad"
                    {...register('datosComprador.ciudad', { required: true })}
                    error={!!e?.ciudad}
                    variant="outlined"
                />
                <TextField
                    label="Departamento"
                    {...register('datosComprador.departamento', { required: true })}
                    error={!!e?.departamento}
                    variant="outlined"
                />
                {personType === 'Natural' ? <NaturalFields /> : personType === 'Juridico' ? <JuridicoFields /> : null}
                <Controller
                    name="datosComprador.ids"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <DocumentUploader
                            files={field.value}
                            setFile={field.onChange}
                            transformedFileName="comprador_id"
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
                        name={`datosComprador.poder`}
                        control={control}
                        render={({ field }) => (
                            <DocumentUploader
                                files={field.value}
                                setFile={field.onChange}
                                transformedFileName="comprador_poder"
                                error={!!e?.poder}
                                buttonLabel="Poder"
                                helperText="Poder, en caso de actuar mediante apoderado."
                            />
                        )}
                    />
                }
            </Box>
        </FormSection>
    );
};

export default Comprador;
