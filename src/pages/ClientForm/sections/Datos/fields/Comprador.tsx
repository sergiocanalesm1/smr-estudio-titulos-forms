import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const CompradorFields: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <>
            <TextField
                label="Nombre del cliente"
                {...register('datosComprador.nombreCliente', { required: true })}
                error={!!errors?.nombreCliente}
                variant="outlined"
            />
            <TextField
                label="Correo electrónico"
                {...register('datosComprador.email', {
                    required: true,
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                })}
                error={!!errors?.email}
                variant="outlined"
            />
            <TextField
                label="Identificación"
                {...register('datosComprador.identificacion', { required: true })}
                error={!!errors?.identificacion}
                variant="outlined"
            />
            <TextField
                label="Dirección"
                {...register('datosComprador.direccion', { required: true })}
                error={!!errors?.direccion}
                helperText="En caso de estar fuera del país agradecemos poner una dirección de Colombia"
                variant="outlined"
            />
            <TextField
                label="Teléfono"
                {...register('datosComprador.tel', {
                    required: true,
                    pattern: { value: /^[+\d]+$/, message: 'Debe ser un número válido' },
                })}
                error={!!errors?.tel}
                helperText={!!errors?.tel ? 'Debe ser un número válido' : ''}
                variant="outlined"
            />
            <TextField
                label="Barrio"
                {...register('datosComprador.barrio', { required: true })}
                error={!!errors?.barrio}
                variant="outlined"
            />
            <TextField
                label="Localidad"
                {...register('datosComprador.localidad', { required: true })}
                error={!!errors?.localidad}
                variant="outlined"
            />
            <TextField
                label="Departamento"
                {...register('datosComprador.departamento', { required: true })}
                error={!!errors?.departamento}
                variant="outlined"
            />
            <TextField
                label="Código postal"
                {...register('datosComprador.codigoPostal', {
                    required: true,
                    pattern: { value: /^[+\d]+$/, message: 'Debe ser un número válido' },
                })}
                error={!!errors?.codigoPostal}
                helperText={!!errors?.codigoPostal ? 'Debe ser un número válido' : ''}
                variant="outlined"
            />
            <TextField
                label="Número de los certificados de tradición"
                {...register('datosComprador.certificadosTradicion', { required: true })}
                error={!!errors?.certificadosTradicion}
                variant="outlined"
            />
        </>
    )
};