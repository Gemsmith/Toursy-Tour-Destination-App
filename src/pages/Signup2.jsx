import { useState } from 'react';
import validate from '../utils/inputValidation.util';
import '../sass/pages/Signup2.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import fbLogo from '../assets/svg/fb-logo.svg';
import googleLogo from '../assets/svg/google-logo.svg';
import { googleLoginSignup, facebookLoginSignup } from '../redux/api';
import { useDispatch } from 'react-redux';
import { localSignupThunk } from '../redux/features/authSlice';
import { useForm } from 'react-hook-form';

const Signup2 = () => {
  const dispatch = useDispatch();

  // Social & Local Login/Signups are exported from src/store/api.js
  // Local Signup is handled in handleSubmit below & Socials are handled in the onClick events of resp. social buttons

  // --------------Form functionality START---------------------------------
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, firstName, lastName, cPassword } = data;

    if (email && password && firstName && lastName && cPassword) {
      dispatch(localSignupThunk({ email, password, cPassword, firstName, lastName }));
    }
  };

  // --------------Form functionality END---------------------------------
  // VALIDATION PATTERN - https://www.freecodecamp.org/news/add-form-validation-in-react-app-with-react-hook-form/

  return (
    <section className="signup2">
      <div className="signup__forms-container">
        {/* Heading */}
        <h1 className="">Sign Up</h1>

        <div className="signup__forms-container-forms ">
          {/* Local Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="signup__forms-local">
              {/* First Name Field */}
              <div className="signup__forms-local-input">
                <label htmlFor="fname" className="">
                  First Name
                </label>
                <input
                  onKeyUp={() => trigger(`fname`)}
                  id="fname"
                  type="text"
                  placeholder="Ex. John"
                  {...register('fname', {
                    required: 'Required',
                    minLength: { value: 3, message: 'Min. 3 chars.' },
                  })}
                />
                {errors?.fname && (
                  <small className="input-warning">{errors.fname.message}</small>
                )}
              </div>

              {/* Last Name Field */}
              <div className="signup__forms-local-input">
                <label htmlFor="lname" className="">
                  Last Name
                </label>
                <input
                  onKeyUp={() => trigger(`lname`)}
                  id="lname"
                  type="text"
                  placeholder="Ex. Smith"
                  {...register('lname', {
                    required: 'Required',
                  })}
                />
                {errors?.lname && (
                  <small className="input-warning">{errors.lname.message}</small>
                )}
              </div>

              {/* Email Field */}
              <div className="signup__forms-local-input span-2-grid-cols">
                <label htmlFor="email" className="">
                  Email
                </label>
                <input
                  onKeyUp={() => trigger(`email`)}
                  id="email"
                  type="email"
                  placeholder="Ex. john@gmail.com"
                  {...register('email', {
                    required: 'Required',
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors?.email && (
                  <small className="input-warning">{errors.email.message}</small>
                )}
              </div>

              {/* Password Field */}
              <div className="signup__forms-local-input span-2-grid-cols-responsive">
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  onKeyUp={() => trigger(`password`)}
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  {...register('password', {
                    required: 'Required',
                    minLength: { value: 5, message: 'Min. 5 chars.' },
                  })}
                />
                {errors?.password && (
                  <small className="input-warning">{errors.password.message}</small>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="signup__forms-local-input span-2-grid-cols-responsive">
                <label htmlFor="cPassword" className="">
                  Confirm Password
                </label>

                <input
                  onKeyUp={() => trigger(`cPassword`)}
                  id="cPassword"
                  type="password"
                  placeholder="Confirm Password"
                  {...register('cPassword', {
                    required: 'Required',
                    minLength: { value: 5, message: 'Min. 5 chars.' },
                  })}
                />
                {errors?.cPassword && (
                  <small className="input-warning">{errors.cPassword.message}</small>
                )}
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

export default Signup2;
