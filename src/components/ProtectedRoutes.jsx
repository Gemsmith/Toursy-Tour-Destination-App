import React from 'react';
import { useSelector } from 'react-redux';
import RedirectToLogin from './RedirectToLogin';

const ProtectedRoutes = ({ children }) => {
  // This component was a while ago, but now after development of most other components of this app,
  // we are fixing this security issues. And thus we have implemented a logic in the app.jsx. It works as follows:
  // 1 case is when loggedInUser is still in state/store from an earlier login but the session at server has expired.
  // Therefore in app.jsx we are checking if cookieExpiry has happened and then if so we will dispatch logoutThunk().
  // Which will clear the loggedInuser, and then this component will redirect to login if the browser id opened at any
  // protected page/url.
  const { loggedInUser } = useSelector((state) => state.user);

  return loggedInUser ? children : <RedirectToLogin />;
};

export default ProtectedRoutes;
