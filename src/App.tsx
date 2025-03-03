import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import InternalForm from './pages/InternalForm';
import ClientForm from './pages/ClientForm/ClientForm';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/internal" element={<InternalForm />} />
      <Route path="/cliente" element={<ClientForm />} />
    </Routes>
  );
};

export default App;

