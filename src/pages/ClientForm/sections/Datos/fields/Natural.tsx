import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export function NaturalFields({ partyType }: { partyType: 'Comprador' | 'Vendedor' }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const e = errors[`datos${partyType}`] as any;
    return (
        <TextField
            label="Estado Civil"
            {...register(`datos${partyType}.estadoCivil`, { required: true })}
            error={!!e?.estadoCivil}
            variant="outlined"
        />
    );
};