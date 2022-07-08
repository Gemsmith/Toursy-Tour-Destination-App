import { Link } from 'react-router-dom';
import '../sass/pages/Login.scss';
import fbLogo from '../assets/svg/fb-logo.svg';
import googleLogo from '../assets/svg/google-logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { localLoginThunk } from '../redux/features/authSlice';
import SpinnerLoader from '../components/SpinnerLoader';
import { googleLoginSignup, facebookLoginSignup } from '../redux/api';
import { useForm } from 'react-hook-form';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { motion } from 'framer-motion';

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // Social & Local Login/Signups are exported from src/store/api.js
  // Local is handled in handleSubmit below & Socials are handled in the onClick events of resp. social buttons

  // --------------Form functionality START---------------------------------
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email: loginEmail, password: loginPassword } = data;

    if (loginEmail && loginPassword) {
      dispatch(localLoginThunk({ loginEmail, loginPassword }));
    }
  };

  // --------------Form functionality END---------------------------------
  // VALIDATION PATTERN - https://www.freecodecamp.org/news/add-form-validation-in-react-app-with-react-hook-form/

  return (
    <section className="login">
      <div className="login__forms-container">
        {/* Heading */}

        <motion.h1
          whileInView={{ y: [-50, 0], opacity: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className=""
        >
          Login
        </motion.h1>

        <div className="login__forms-bottom ">
          {/* Local Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              whileInView={{ x: [50, 0], opacity: [0, 1] }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="login__forms-left"
            >
              {/* Email Field */}
              <div className="login__forms-left-input">
                <label className="" htmlFor="email">
                  Your Email
                </label>
                <input
                  onKeyUp={() => trigger(`email`)}
                  id="email"
                  type="email"
                  placeholder="Ex. john@gmail.com"
                  {...register('email', {
                    required: 'Required',
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
                  })}
                />
                {errors?.email && (
                  <small className="input-warning">{errors.email.message}</small>
                )}
              </div>

              {/* Password Field */}
              <div className="login__forms-left-input">
                <label className="" htmlFor="password">
                  Your Password
                  {/* <span className=""> *</span> */}
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

              <p className="login__forms-left-privacy-disclaimer">
                We will not share your data with any third parties.
              </p>

              {/* Submit Button */}
              <button type="submit" disabled={loading}>
                {loading ? <SpinnerLoader /> : 'Login'}
              </button>
            </motion.div>
          </form>

          {/* Socials Container */}
          <motion.div
            whileInView={{ x: [-50, 0], opacity: [0, 1] }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="login__forms-right"
          >
            {/* Social Buttons Div */}
            <div className="login__forms-right-btn-container">
              <button onClick={() => googleLoginSignup()} className="">
                <Tippy
                  content={`Google login not working? Means GCP trial period may have ended!`}
                >
                  <div className="">
                    <img src={googleLogo} className="" alt="google logo" />
                    <span className="">Log in with Google</span>
                  </div>
                </Tippy>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Login;
