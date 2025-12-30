import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import './App.css';
import { Routes } from './Routes';

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={Routes} />
    </Suspense>
  );
}

export default App;
