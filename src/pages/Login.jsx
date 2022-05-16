import { useState } from 'react';
import validate from '../utils/inputValidation.util';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import '../sass/pages/Login.scss';
import fbLogo from '../assets/svg/fb-logo.svg';
import googleLogo from '../assets/svg/google-logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { localLoginThunk } from '../redux/features/authSlice';
import SpinnerLoader from '../components/SpinnerLoader';
import { googleLoginSignup, facebookLoginSignup } from '../redux/api';

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // Social & Local Login/Signups are exported from src/store/api.js
  // Local is handled in handleSubmit below & Socials are handled in the onClick events of resp. social buttons

  // For Local login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validateEmail = validate.email(loginEmail);
    const validatePassword = validate.password(loginPassword);

    if (validateEmail?.status === 'error' || validatePassword?.status === 'error') {
      console.log(`Validation Error`);
      toast.error(`${validateEmail.errorMessage}`);
      toast.error(`${validatePassword.errorMessage}`);
      return;
    }

    // After our inputs are validated. Now we will make the call to the API. But for that we'll first call the action at the slice. Which will do state changes like loading, storing data at store etc. & most importantly handle the API call.
    // So we will pass the input data to it, and it will forward it to the function that makes the API call.
    dispatch(localLoginThunk({ loginEmail, loginPassword }));
  };

  return (
    <section className="login">
      <div className="login__forms-container">
        {/* Heading */}

        <h1 className="">Login</h1>

        <div className="login__forms-bottom ">
          {/* Local Login Form */}
          <form onSubmit={handleFormSubmit}>
            <div className="login__forms-left">
              {/* Email Field */}
              <div className="login__forms-left-input">
                <label htmlFor="email" className="">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoComplete="on"
                />
              </div>

              {/* Password Field */}
              <div className="login__forms-left-input">
                <label htmlFor="password" className="">
                  Your Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="on"
                />
              </div>

              <p>We will not share your data with any third parties.</p>

              {/* Submit Button */}
              <button type="submit" disabled={loading}>
                {loading ? <SpinnerLoader /> : 'Login'}
              </button>
            </div>
          </form>

          {/* Socials Container */}
          <div className="login__forms-right">
            {/* Social Buttons Div */}
            <div className="login__forms-right-btn-container">
              <button onClick={() => googleLoginSignup()} className="">
                <div className="">
                  <img src={googleLogo} className="" alt="google logo" />
                  <span className="">Log in with Google</span>
                </div>
              </button>

              <button onClick={() => facebookLoginSignup()} className="">
                <div className="">
                  <img src={fbLogo} className="" alt="google logo" />
                  <span className="">Log in with Facebook</span>
                </div>
              </button>
            </div>

            <div className="login__forms-right-signup__btn">
              <span>Don't have an account? </span>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
