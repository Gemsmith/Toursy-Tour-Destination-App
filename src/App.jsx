import Navbar from './components/Navbar';
import './App.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Signup from './pages/Signup';
import LoginFailed from './pages/LoginFailed';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import AddEditTour from './pages/AddEditTour';
import Dashboard from './pages/Dashboard';
import TourDetails from './pages/TourDetails';
import UserDetails from './pages/UserDetails';
import { getLoggedInUserThunk, setLoggedInUserValue } from './redux/features/userSlice';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFound from './pages/NotFound';
import SearchResultsPage from './pages/SearchResultsPage';
import TaggedTours from './pages/TaggedTours';
import { logoutThunk } from './redux/features/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const isUserAtLocalStorage = JSON.parse(localStorage.getItem('user'));

  // As soon as our app loads we want to fetch any user that has already loggedIn previously. So that we can display their username in the navbar and also it's better UX, because otherwise as soon as they refresh the page, the navbar will show the login button, and they'd have to login again. Unless we store the loggedIn user via some state persistence functionality.
  useEffect(() => {
    // Check to find the user in the localStorage

    // Only, if user is not in localStorage
    if (!isUserAtLocalStorage) {
      // dispatch the action to get user from server. We needed to implement this fetching because for social logins passportJs can only do a redirect on successful authentication. Which means we can't send a res.json to the server with {user}, can only do a res.redirect('/something'). So after a social login, on the client we have to look if we have a user in local storage and fetch him otherwise.
      // This dispatch action will also set the user in the store & localStorage
      dispatch(getLoggedInUserThunk());
    } else {
      // We want to logOut the user if the session has been expired at the server. So that's why we have added a expiryDate in the user object before storing loggedIn user's data at localStorage.
      // And after logoutThunk is done, ProtectedRoutes component will automatically redirect to the login page, becuase it checks for loggedInUser in state to let the client access protected pages, which will now be null.
      // If current time in milliseconds gets higher than cookie expiry time.. Do something
      if (
        Date.parse(new Date().toUTCString()) >
        Date.parse(new Date(isUserAtLocalStorage?.cookieExpiry))
      ) {
        toast('Session Expired - Logging Out');
        dispatch(logoutThunk());
      }

      dispatch(setLoggedInUserValue(isUserAtLocalStorage));
    }

    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="app__wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginfailed" element={<LoginFailed />} />

          {/* =============PROTECTED ROUTES START==================== */}
          {/* Add a new tour - NEEDS AUTH */}
          <Route
            path="/addTour"
            element={
              <ProtectedRoutes>
                <AddEditTour />
              </ProtectedRoutes>
            }
          />
          {/* Edit your uploaded tour's details - NEEDS AUTH */}
          <Route
            path="/editTour/:id"
            element={
              <ProtectedRoutes>
                <AddEditTour />
              </ProtectedRoutes>
            }
          />
          {/* View your uploaded tours - NEEDS AUTH */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          {/* =============PROTECTED ROUTES END==================== */}

          <Route path="/tour" element={<Home />} />
          {/* View a tour's details */}
          <Route path="/tour/:id" element={<TourDetails />} />
          {/* Fetch any user's details (For creator profilePic, etc.) */}
          <Route path="/user/:id" element={<UserDetails />} />

          {/* Search tours */}
          <Route path="/tour/search" element={<SearchResultsPage />} />

          {/* Find Tagged tours */}
          <Route path="/tour/tag/:tag" element={<TaggedTours />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
};

export default App;
