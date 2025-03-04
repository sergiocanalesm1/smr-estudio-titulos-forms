import { Controller, useFormContext } from "react-hook-form";
import DocumentUploader from "../../../../../components/DocumentUploader";
import { PartyType } from "../../../../../types";

interface JuridicoFieldsProps {
    partyType: PartyType;
}

export const JuridicoFields: React.FC<JuridicoFieldsProps> = ({ partyType }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const e = errors[`datos${partyType}`] as any;

    return (
        <>
            <Controller
                name={`datos${partyType}.certificadoExistencia`}
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
                name={`datos${partyType}.certificadoComposicion`}
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
};