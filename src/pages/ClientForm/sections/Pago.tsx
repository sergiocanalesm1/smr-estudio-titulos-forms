import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import FormSection from '../../../components/FormSection';
import { Typography, Link } from '@mui/material';
import DocumentUploader from '../../../components/DocumentUploader';
import { sectionNames } from '../../../utils/constants';

interface PagoProps {
    paymentValue: string;
    validated: boolean;
    setValidated: (validated: boolean) => void;
}

const Pago: React.FC<PagoProps> = ({ paymentValue, validated, setValidated }) => {
    const { control, trigger, formState: { errors } } = useFormContext();
    const paymentLink = import.meta.env.VITE_PAYMENT_LINK ?? '';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = await trigger('soportePago');
        if (isValid) {
            setValidated(true);
            console.log('soportePago section is valid!');
        }
    }

    return (
        <FormSection
            title={sectionNames.soportePago}
            description="Para continuar con el trámite es necesario que allegue el soporte de pago de los honorarios y se encuentre la documentación completa"
            done={validated}
            setDone={setValidated}
            onSubmit={handleSubmit}
        >
            <Typography variant="body1" >
                <strong>Valor Transacción: ${Number(paymentValue).toLocaleString()} </strong>
            </Typography>
            <Link href={paymentLink} target="_blank" rel="noopener noreferrer">
                Link de Pago WOMPI
            </Link>
            <Controller
                name="soportePago"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <DocumentUploader
                        files={field.value}
                        setFile={field.onChange}
                        transformedFileName="soportePago"
                        multiple={false}
                        error={!!errors?.soportePago}
                        buttonLabel="Soporte de Pago"
                        helperText="Suba el soporte de pago de los honorarios generado por el link de pago"
                    />
                )}
            />
        </FormSection>
    );
};

export default Pago;

