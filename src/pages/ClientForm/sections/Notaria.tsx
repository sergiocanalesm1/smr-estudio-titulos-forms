import React, { useState } from 'react';
import { Box, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import FormSection from '../../../components/FormSection';
import { useFormContext } from 'react-hook-form';

interface NotariaProps {
    validated: boolean;
    setValidated: (value: boolean) => void;
}

const Notaria: React.FC<NotariaProps> = ({ validated, setValidated }) => {

    const { setValue } = useFormContext();

    const [selectedNotaria, setSelectedNotaria] = useState<string>('Notaria 38');

    const [nombreFuncionario, setNombreFuncionario] = useState<string>('');
    const [correoElectronico, setCorreoElectronico] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');

    const handleSectionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`notaria section is valid!`);
        let value = selectedNotaria;
        if (selectedNotaria === 'Otra') {
            value = `Otra Notaría: ${nombreFuncionario} - ${correoElectronico} - ${telefono}`;
        }
        setValue('notaria', value);
        setValidated(true);
    };

    return (
        <FormSection
            title="Notaria"
            description="Estas son las Notarías con las que tenemos convenio, pero si desea puede escoger alguna diferente."
            submitBtnText="Validar sección"
            loading={false}
            onSubmit={handleSectionSubmit}
            done={validated}
            setDone={setValidated}
        >
            <RadioGroup
                value={selectedNotaria}
                defaultChecked
                onChange={(e) => setSelectedNotaria(e.target.value)}>
                <FormControlLabel value="Notaria 38" control={<Radio />} label="Notaría 38 ubicada en la Cra. 7 No. 33 -13 (Firma domicilio)." />
                <FormControlLabel value="Notaria 57" control={<Radio />} label="Notaría 57 ubicada en la Calle 45a Sur No. 50 - 47." />
                <FormControlLabel value="Notaria 41" control={<Radio />} label="Notaría 41 Ubicada en la Calle 85 No. 12." />
                <FormControlLabel value="Otra" control={<Radio />} label="Otra" />
            </RadioGroup>

            {selectedNotaria === 'Otra' && (
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Nombre funcionario notaría"
                        variant="outlined"
                        margin="normal"
                        value={nombreFuncionario}
                        onChange={(e) => setNombreFuncionario(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Correo electrónico"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        value={correoElectronico}
                        onChange={(e) => setCorreoElectronico(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Teléfono"
                        variant="outlined"
                        margin="normal"
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </Box>
            )}
        </FormSection>
    );
};

export default Notaria;