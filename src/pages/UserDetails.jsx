import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SpinnerLoader from '../components/SpinnerLoader';
import { getUserByIdThunk } from '../redux/features/userSlice';
import '../sass/pages/UserDetails.scss';
import { formattedDate } from '../utils/dateFormatter';
import { motion } from 'framer-motion';

const UserDetails = () => {
  const userId = useParams().id;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserByIdThunk(userId));
    // eslint-disable-next-line
  }, [userId]);

  if (currentUser && userId !== currentUser._id) {
    return <SpinnerLoader />;
  }

  return (
    <section className="userdetails">
      <motion.h1
        whileInView={{ y: [50, 0], opacity: [0, 1] }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="userdetails-heading"
      >
        Personal Info
      </motion.h1>
      {currentUser && (
        <div className="userdetails__container">
          {/* Profile Pic + Name + Date */}
          <div className="userdetails__container-image-name-date">
            {/* Profile Pic */}
            <motion.img
              whileInView={{ x: [-50, 0], opacity: [0, 1] }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              className="image"
              src={currentUser?.profileImage}
              alt=""
            />

            <motion.div
              whileInView={{ x: [50, 0], opacity: [0, 1] }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              className="name-joinDate"
            >
              {/* Name */}
              <span className="name">{currentUser?.name}</span>

              {/* Join Date */}
              <div className="joinDate">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="joinDate-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="joinDate-text">
                  Since {formattedDate(currentUser?.createdAt)}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Email */}
          <motion.div
            whileInView={{ x: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="userdetails__container-email"
          >
            <label className="email-label">Email address</label>
            <a className="email-link" href={`mailto:${currentUser?.email}`}>
              {currentUser?.email}
            </a>
          </motion.div>

          <motion.div
            whileInView={{ x: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="userdetails__container-lastVisited"
          >
            <label className="lastVisited-label">Last Visit</label>
            <div className="lastVisited-text">
              {formattedDate(currentUser?.lastVisited)}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default UserDetails;
