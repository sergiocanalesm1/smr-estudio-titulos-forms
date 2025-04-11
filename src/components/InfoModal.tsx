import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    isError?: boolean;
    title?: string;
    message?: string;
    onConfirm?: () => void;
}

const InfoModal: React.FC<CustomDialogProps> = ({ open, onClose, isError = false, title, message, onConfirm }) => {
    const defaultTitle = isError ? "Error" : "Éxito";
    const defaultMessage = isError
        ? "Ocurrió un problema al realizar la acción."
        : "La acción se realizó correctamente.";
    const Icon = isError ? ErrorIcon : CheckCircleIcon;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    width: 300,
                    textAlign: 'center',
                }}
            >
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <Icon color={isError ? 'error' : 'success'} sx={{ fontSize: 40 }} />
                    <Typography variant="h6" color={isError ? 'error' : 'primary'}>
                        {title || defaultTitle}
                    </Typography>
                    <Typography variant="body1">{message || defaultMessage}</Typography>
                </Box>
                <Box mt={3} display="flex" justifyContent="center" gap={2}>
                    {onConfirm && (
                        <Button onClick={onConfirm} color="primary" variant="contained">
                            Confirmar
                        </Button>
                    )}
                    <Button onClick={onClose} color="primary" variant="outlined">
                        Cerrar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default InfoModal;
