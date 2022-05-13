import React, { useState } from 'react';
import validate from '../utils/inputValidation.util';
import '../sass/pages/Signup.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import fbLogo from '../assets/svg/fb-logo.svg';
import googleLogo from '../assets/svg/google-logo.svg';
import { googleLoginSignup, facebookLoginSignup } from '../redux/api';
import { useDispatch } from 'react-redux';
import { localSignupThunk } from '../redux/features/authSlice';

const Signup = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  // Social & Local Login/Signups are exported from src/store/api.js
  // Local Signup is handled in handleSubmit below & Socials are handled in the onClick events of resp. social buttons

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate user's input, if for some reason form's built-in validation bugs out
    const validateEmail = validate.email(email);
    const validatePassword = validate.password(password);
    const validateFirstName = validate.firstName(firstName);
    const validateLastName = validate.lastName(lastName);
    const validateCPassword = validate.cPassword(password, cPassword);

    if (
      validateEmail?.status === 'error' ||
      validatePassword?.status === 'error' ||
      validateFirstName?.status === 'error' ||
      validateLastName?.status === 'error' ||
      validateCPassword?.status === 'error'
    ) {
      toast.error(`${validateEmail.errorMessage}`);
      toast.error(`${validatePassword.errorMessage}`);
      toast.error(`${validateFirstName.errorMessage}`);
      toast.error(`${validateLastName.errorMessage}`);
      toast.error(`${validateCPassword.errorMessage}`);
      console.log(`Validation Error`);
      return;
    }

    dispatch(localSignupThunk({ email, password, cPassword, firstName, lastName }));
  };

  return (
    <section className="signup">
      <div className="signup__forms-container">
        {/* Heading */}
        <h1 className="">Sign Up</h1>

        <div className="signup__forms-container-forms ">
          {/* Local Signup Form */}
          <form onSubmit={handleFormSubmit}>
            <div className="signup__forms-local">
              {/* First Name Field */}
              <div className="signup__forms-local-input">
                <label htmlFor="fname" className="">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="on"
                />
              </div>

              {/* Last Name Field */}
              <div className="signup__forms-local-input">
                <label htmlFor="lname" className="">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="on"
                />
              </div>

              {/* Email Field */}
              <div className="signup__forms-local-input span-2-grid-cols">
                <label htmlFor="email" className="">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete="on"
                />
              </div>

              {/* Password Field */}
              <div className="signup__forms-local-input span-2-grid-cols-responsive">
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="on"
                />
              </div>

              {/* Confirm Password Field */}
              <div className="signup__forms-local-input span-2-grid-cols-responsive">
                <label htmlFor="cPassword" className="">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="cPassword"
                  name="cPassword"
                  placeholder="Confirm Password"
                  onChange={(e) => setCPassword(e.target.value)}
                  value={cPassword}
                  autoComplete="on"
                />
              </div>

              <p className="span-2-grid-cols">
                We will not share your data with any third parties.
              </p>

              {/* Submit Button */}
              <button type="submit" className="span-2-grid-cols">
                Submit
              </button>
            </div>
          </form>

          {/* Socials Container */}
          <div className="signup__forms-social">
            {/* Social Buttons Div */}
            <div className="signup__forms-social-btn-container">
              <button onClick={() => googleLoginSignup()} className="">
                <div className="">
                  <img src={googleLogo} className="" alt="google logo" />
                  <span className="">Sign up with Google</span>
                </div>
              </button>

              <button onClick={() => facebookLoginSignup()} className="">
                <div className="">
                  <img src={fbLogo} className="" alt="google logo" />
                  <span className="">Sign up with Facebook</span>
                </div>
              </button>
            </div>

            <div className="signup__forms-social-login__btn">
              <span>Already have an account? </span>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
