import React, { useEffect } from 'react';
import { Paper, Box, Typography, Button, CircularProgress, Collapse, IconButton } from '@mui/material';
import { ExpandMore, CheckCircleOutline } from '@mui/icons-material';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  submitBtnText: string;
  loading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  done?: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  submitBtnText,
  loading,
  onSubmit,
  done = false
}) => {
  const [expanded, setExpanded] = React.useState(!done);

  useEffect(() => {
    if (done) {
      setExpanded(false);
    }
  }, [done]);

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
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandMore /> : <CheckCircleOutline color="success" />}
          </IconButton>
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
          {done ? (
            <CheckCircleOutline color="success" />
          ) : (
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : submitBtnText}
            </Button>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default FormSection;
