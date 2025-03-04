import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { DatosCompradorForm, DatosJuridico, DatosNatural, PersonType } from '../../../types';
import FormSection from '../../../components/FormSection';
import DocumentUploader from '../../../components/DocumentUploader';
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
                        transformedFileName="certificadoExistencia"
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
                        transformedFileName="certificadoComposicion"
                        error={!!(e as Partial<DatosCompradorForm & DatosJuridico>)?.certificadoComposicion}
                        buttonLabel="Certificado"
                        helperText="Certificado de composición accionaria no mayor a 60 días firmada por el representante legal o revisor fiscal, hasta llegar a la persona natural."
                    />
                )}
            />
        </>

    );

    return (
        <FormSection
            title="Datos Comprador"
            submitBtnText="Validar sección"
            loading={false}
            onSubmit={handleSectionSubmit}
            done={validated}
            setDone={setValidated}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Nombre del cliente"
                    {...register('datosComprador.nombreCliente', { required: true })}
                    error={!!e?.nombreCliente}
                    variant="outlined"
                />
                <TextField
                    label="Correo electrónico"
                    {...register('datosComprador.email', {
                        required: true,
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                    })}
                    error={!!e?.email}
                    variant="outlined"
                />
                <TextField
                    label="Identificación"
                    {...register('datosComprador.identificacion', { required: true })}
                    error={!!e?.identificacion}
                    variant="outlined"
                />
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
                    helperText={!!e?.tel ? 'Debe ser un número válido' : ''}
                    variant="outlined"
                />
                <TextField
                    label="Barrio"
                    {...register('datosComprador.barrio', { required: true })}
                    error={!!e?.barrio}
                    variant="outlined"
                />
                <TextField
                    label="Localidad"
                    {...register('datosComprador.localidad', { required: true })}
                    error={!!e?.localidad}
                    variant="outlined"
                />
                <TextField
                    label="Departamento"
                    {...register('datosComprador.departamento', { required: true })}
                    error={!!e?.departamento}
                    variant="outlined"
                />
                <TextField
                    label="Código postal"
                    {...register('datosComprador.codigoPostal', {
                        required: true,
                        pattern: { value: /^[+\d]+$/, message: 'Debe ser un número válido' },
                    })}
                    error={!!e?.codigoPostal}
                    helperText={!!e?.codigoPostal ? 'Debe ser un número válido' : ''}
                    variant="outlined"
                />
                <TextField
                    label="Número de los certificados de tradición"
                    {...register('datosComprador.certificadosTradicion', { required: true })}
                    error={!!e?.certificadosTradicion}
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
                    name={`datosComprador.poder`}
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
        </FormSection>
    );
};

export default Comprador;
