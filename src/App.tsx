import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import InternalForm from './pages/InternalForm';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/internal" element={<InternalForm/>} />
    </Routes>
  );
};

export default App;

