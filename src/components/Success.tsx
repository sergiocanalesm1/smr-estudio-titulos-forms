import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Stack
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSearchParams } from 'react-router-dom';

const FormSuccessPage: React.FC = () => {
    const handlePrimaryAction = () => {
        window.location.reload();
        window.history.back();

    };

    const [searchParams] = useSearchParams();
    const tipo = searchParams.get('tipo') ?? '';

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    textAlign: 'center'
                }}
            >
                <Stack spacing={3} alignItems="center">
                    <CheckCircleOutlineIcon
                        color="success"
                        sx={{ fontSize: 80 }}
                    />

                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Enviado Con Éxito
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        {tipo === 'cliente' ? 'Muchas gracias, se le notificarán los siguientes pasos' : 'Se envió el correo al cliente'}
                    </Typography>

                    {tipo !== 'cliente' &&
                        <Box sx={{ mt: 3 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<RefreshIcon />}
                                onClick={handlePrimaryAction}
                                sx={{ fontWeight: 500 }}
                            >
                                Llenar otro formulario
                            </Button>
                        </Box>
                    }
                </Stack>
            </Paper>
        </Container>
    );
};

export default FormSuccessPage;