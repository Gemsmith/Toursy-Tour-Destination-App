import { useState } from 'react';
import '../sass/pages/Signup.scss';
import { Link } from 'react-router-dom';
import fbLogo from '../assets/svg/fb-logo.svg';
import googleLogo from '../assets/svg/google-logo.svg';
import SpinnerLoader from '../components/SpinnerLoader';
import { googleLoginSignup, facebookLoginSignup } from '../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { localSignupThunk } from '../redux/features/authSlice';
import { useForm } from 'react-hook-form';
import FileBase64 from 'react-file-base64';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { motion } from 'framer-motion';

const Signup = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // Social & Local Login/Signups are exported from src/store/api.js
  // Local Signup is handled in handleSubmit below & Socials are handled in the onClick events of resp. social buttons
  const [fileData, setFileData] = useState(null);

  // --------------Form functionality START---------------------------------
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = { ...data, userAvatar: fileData };

    const {
      fname: firstName,
      lname: lastName,
      password,
      cPassword,
      email,
      userAvatar,
    } = formData;

    if (email && password && firstName && lastName && cPassword && userAvatar) {
      dispatch(
        localSignupThunk({ email, password, cPassword, firstName, lastName, userAvatar })
      );
    }
  };

  // --------------Form functionality END---------------------------------
  // VALIDATION PATTERN - https://www.freecodecamp.org/news/add-form-validation-in-react-app-with-react-hook-form/

  return (
    <section className="signup">
      <div className="signup__forms-container">
        {/* Heading */}
        <motion.h1
          whileInView={{ y: [-50, 0], opacity: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className=""
        >
          Sign Up
        </motion.h1>

        <div className="signup__forms-container-forms ">
          {/* Local Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              whileInView={{ x: [50, 0], opacity: [0, 1] }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="signup__forms-local"
            >
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
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, //eslint-disable-line
                  })}
                />
                {errors?.email && (
                  <small className="input-warning">{errors.email.message}</small>
                )}
              </div>

              <div className="signup__forms-local-fileUpload">
                <label htmlFor="file" className="">
                  Avatar
                </label>
                <FileBase64
                  id="file"
                  className="file-input"
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setFileData(base64);
                  }}
                />
              </div>

              <p className="signup__forms-local-privacy-disclaimer span-2-grid-cols">
                We will not share your data with any third parties.
              </p>

              {/* Submit Button */}
              <button type="submit" className="span-2-grid-cols">
                {loading ? <SpinnerLoader /> : 'Signup'}
              </button>
            </motion.div>
          </form>

          {/* Socials Container */}
          <motion.div
            whileInView={{ x: [-50, 0], opacity: [0, 1] }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="signup__forms-social"
          >
            {/* Social Buttons Div */}
            <div className="signup__forms-social-btn-container">
              <button onClick={() => googleLoginSignup()} className="">
                <Tippy
                  content={`Google signup not working? Means GCP trial period may have ended!`}
                >
                  <div className="">
                    <img src={googleLogo} className="" alt="google logo" />
                    <span className="">Sign up with Google</span>
                  </div>
                </Tippy>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
