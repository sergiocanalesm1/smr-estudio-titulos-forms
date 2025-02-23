import React from 'react';
import { Container, Typography } from '@mui/material';
import FormSection from '../components/FormSection';
import DocumentUploader from '../components/DocumentUploader';

const HomePage: React.FC = () => {
    const file = new File(['file'], 'filefileeeeeeeeeeeeeeeeeefileeeeeeeeeeeeeeeeeefileeeeeeeeeeeeeeeeeefileeeeeeeeeeeeeeeeeefileeeeeeeeeeeeeeeeee.pdf', { type: 'application/pdf' });
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Estudio de Titulos
      </Typography>
      <Typography variant="body1">
        This is a robust React app setup using TypeScript, Vite, Material UI, and React Router.
      </Typography>
      <FormSection
        title="Form Section"
        description="This is a form section."
        submitBtnText="Submit"
        loading={false}
        onSubmit={(event) => {
          event.preventDefault();
        }}
        >
          <Typography variant="body1">Form content goes here.</Typography>
          <DocumentUploader
            files={[file]}
            setFile={() => {}}
            buttonLabel='Avaluo'
            transformedFileName="transformed"
            multiple={false}
            error={false}
            />
        </FormSection>
    </Container>
  );
};

export default HomePage;
