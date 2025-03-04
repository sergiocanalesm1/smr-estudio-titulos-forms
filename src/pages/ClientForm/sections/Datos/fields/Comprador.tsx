import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const CompradorFields: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const e = errors.datosComprador as any;
    return (
        <>
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
                helperText={!!errors?.tel ? 'Debe ser un número válido' : ''}
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
        </>
    )
};