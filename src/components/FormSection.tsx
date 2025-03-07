import React, { useEffect } from 'react';
import { Paper, Box, Typography, Button, CircularProgress, Collapse } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  submitBtnText?: string;
  loading?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  done?: boolean;
  setDone?: (value: boolean) => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  submitBtnText = "Validar Sección",
  loading,
  onSubmit,
  done = false,
  setDone = () => { },
}) => {
  const [expanded, setExpanded] = React.useState(!done);

  useEffect(() => {
    if (done) {
      setExpanded(false);
    }
  }, [done]);

  const handleModify = () => {
    setDone(false);
    setExpanded(true);
  };

  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        maxWidth: 600,
        margin: '0 auto',
        mb: 4,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        {done && (
          <Box display="flex" alignItems="center">
            <Button variant="outlined" onClick={handleModify} sx={{ mr: 1 }}>
              Modificar
            </Button>
            <CheckCircleOutline color="success" />
          </Box>
        )}
      </Box>
      <Collapse in={expanded}>
        {description && (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {description}
          </Typography>
        )}
        <Box sx={{ my: 3 }}>
          {children}
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : submitBtnText}
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default FormSection;
