import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserByIdThunk } from '../redux/features/userSlice';
import '../sass/pages/UserDetails.scss';
import { formattedDate } from '../utils/dateFormatter';

const UserDetails = () => {
  const userId = useParams().id;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    console.log('inside userDetails');
    dispatch(getUserByIdThunk(userId));
  }, [userId]);

  return (
    <section className="userdetails">
      {/* {user && ( */}
      <h1 className="userdetails-heading">Personal Info</h1>

      <div className="userdetails__container">
        {/* Profile Pic + Name + Date */}
        <div className="userdetails__container-image-name-date">
          {/* Profile Pic */}
          <img className="image" src={currentUser?.profileImageUrl} alt="" />

          <div className="name-joinDate">
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
          </div>
        </div>

        {/* Email */}
        <div className="userdetails__container-email">
          {/* <svg
            className="email-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg> */}
          <label className="email-label">Email address</label>
          <a className="email-link" href="mailto:webmaster@windster.com">
            {currentUser?.email}
          </a>
        </div>

        <div className="userdetails__container-lastVisited">
          <label className="lastVisited-label">Last Visit</label>
          <div className="lastVisited-text">
            {formattedDate(currentUser?.lastVisited)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;

// id;
// name;
// email;
// password;
// profileImageUrl;

// source;

// createdAt;
// lastVisited;
