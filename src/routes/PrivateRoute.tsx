import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import React from 'react';

const PrivateRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const token = Cookies.get('token');
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
