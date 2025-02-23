import React from 'react';
import { Paper, Box, Typography, Button, CircularProgress } from '@mui/material';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  submitBtnText: string;
  loading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  submitBtnText,
  loading,
  onSubmit,
}) => {
  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        backgroundColor: '#fff',
        maxWidth: 600,
        margin: '0 auto',
        my: 4,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
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
    </Paper>
  );
};

export default FormSection;
