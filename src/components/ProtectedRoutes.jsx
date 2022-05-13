import React from 'react';
import { useSelector } from 'react-redux';
import RedirectToLogin from './RedirectToLogin';

const ProtectedRoutes = ({ children }) => {
  const { loggedInUser } = useSelector((state) => state.user);

  return loggedInUser ? children : <RedirectToLogin />;
};

export default ProtectedRoutes;
