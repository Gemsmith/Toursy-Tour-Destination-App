import Navbar from './components/Navbar';
import './App.scss';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Signup from './pages/Signup';
import Axios from 'axios';
import LoginFailed from './pages/LoginFailed';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserFromServer } from './redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromServerThunk } from './redux/features/authSlice';

const App = () => {
  const dispatch = useDispatch();
  // As soon as our app loads we want to fetch any user that has already loggedIn previously. So that we can display their username in the navbar and also it's better UX, because otherwise as soon as they refresh the page, the navbar will show the login button, and they'd have to login again. Unless we store the loggedIn user via some state persistence functionality.
  useEffect(() => {
    // Check to find the user in the localStorage
    const isUserAtLocalStorage = localStorage.getItem('user');

    // Only, if user is not in localStorage
    if (!isUserAtLocalStorage) {
      // dispatch the action to get user from server. We needed to implement this fetching because for social logins passportJs can only do a redirect on successful authentication. Which means we can't send a res.json to the server with {user}, can only do a res.redirect('/something'). So after a social login, on the client we have to look if we have a user in local storage and fetch him otherwise.
      // This dispatch action will also set the user in the store & localStorage
      dispatch(getUserFromServerThunk());
      // And then also set the user in the component's state
      return;
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="app__wrapper">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/login"
            // element={user ? <Navigate to="/" /> : <Login />}
            element={<Login />}
          />

          <Route path="/loginfailed" element={<LoginFailed />} />

          <Route
            path="/post/:id"
            // element={user ? <Post /> : <Navigate to="/login" />}
            element={<Post />}
          />
        </Routes>
      </div>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
};

export default App;
