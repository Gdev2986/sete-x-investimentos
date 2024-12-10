import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// routes
import { AllRoutes } from './index';

const Routes = () => {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
};

export default Routes;
