import React from 'react';
import { Routes, Route } from 'react-router-dom';

import InternalForm from './pages/InternalForm';
import ClientForm from './pages/ClientForm/ClientForm';
import AuthComponent from './auth/Auth';
import FormSuccessPage from './components/Success';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/internal" element={<AuthComponent component={<InternalForm />} />} />
      <Route path="/cliente" element={<ClientForm />} />
      <Route path="/exito" element={<FormSuccessPage />} />
    </Routes>
  );
};

export default App;

