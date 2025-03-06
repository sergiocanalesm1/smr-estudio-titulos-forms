import React from 'react';
import { CheckCircleOutline } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import { sectionNames } from '../utils/constants';
import { ClientFormState } from '../types';

interface StepperProps {
    validatedSections: Record<keyof ClientFormState, boolean>;
    onSubmit: () => void;
}

const Stepper: React.FC<StepperProps> = ({ validatedSections, onSubmit }) => {
    const allSectionsValidated = Object.values(validatedSections).every(Boolean);
    return (
        <Box position="fixed" top={0} right={0} m={2}>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h6">Secciones Completadas</Typography>
                {Object.entries(sectionNames).map(([section, name]) => (
                    <Box key={section} sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
                        <Typography variant='body2'>{name}</Typography>
                        {validatedSections[section as keyof ClientFormState] && <CheckCircleOutline color="success" />}
                    </Box>
                ))}

                {allSectionsValidated && (
                    <Box mt={2} textAlign="right">
                        <Button variant="contained" color="primary" onClick={onSubmit}>
                            Enviar
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default Stepper;