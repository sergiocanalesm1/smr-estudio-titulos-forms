import React, { useState } from 'react';
import { Box, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import FormSection from '../../../components/FormSection';
import { useFormContext } from 'react-hook-form';
import { sectionNames } from '../../../utils/constants';

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
        if (selectedNotaria === 'Otra') {
            const fields = ['nombreFuncionario', 'correoElectronico', 'telefono'];
            const notValid = fields.some(field => validateField(field));
            if (notValid) {
                return;
            }
        }
        let value = selectedNotaria;
        if (selectedNotaria === 'Otra') {
            value = `Otra Notaría: ${nombreFuncionario} - ${correoElectronico} - ${telefono}`;
        }
        console.log(`notaria section is valid!`);
        setValue('notaria', value);
        setValidated(true);
    };

    const validateField = (field: string) => {
        switch (field) {
            case 'nombreFuncionario':
                return !nombreFuncionario;
            case 'correoElectronico':
                return (!correoElectronico || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(correoElectronico));
            case 'telefono':
                return (!telefono || !/^\+?[0-9]+$/.test(telefono));
            default:
                return false;
        }
    }

    return (
        <FormSection
            title={sectionNames.notaria}
            description="Estas son las Notarías con las que tenemos convenio, pero si desea puede escoger alguna diferente."
            submitBtnText="Validar Sección"
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
                        required
                        error={selectedNotaria === 'Otra' && validateField('nombreFuncionario')}
                    />
                    <TextField
                        fullWidth
                        label="Correo electrónico"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        value={correoElectronico}
                        onChange={(e) => setCorreoElectronico(e.target.value)}
                        required
                        error={selectedNotaria === 'Otra' && validateField('correoElectronico')}
                        helperText={selectedNotaria === 'Otra' && validateField('correoElectronico') ? 'Correo electrónico no válido' : ''}
                    />
                    <TextField
                        fullWidth
                        label="Teléfono"
                        variant="outlined"
                        margin="normal"
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                        error={selectedNotaria === 'Otra' && validateField('telefono')}
                        helperText={selectedNotaria === 'Otra' && validateField('telefono') ? 'Teléfono no válido' : ''}
                    />
                </Box>
            )}
        </FormSection>
    );
};

export default Notaria;