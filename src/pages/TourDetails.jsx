import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getTourThunk } from '../redux/features/tourSlice';
import { formattedDate } from '../utils/dateFormatter';
import '../sass/pages/TourDetails.scss';
import cameraIcon from '../assets/svg/camera-icon.svg';
import { getUserByIdThunk } from '../redux/features/userSlice';

const TourDetails = () => {
  const dispatch = useDispatch();

  const tourId = useParams().id;

  // tour is populated in the useEffect
  const { tour } = useSelector((state) => state.tour);
  const { currentUser } = useSelector((state) => state.user);

  let _id,
    title,
    description,
    tags,
    image,
    creatorName,
    creatorId,
    likeCount,
    createdAt,
    fName,
    lName;

  if (tour) {
    ({
      _id,
      title,
      description,
      tags,
      image,
      creatorName,
      creatorId,
      likeCount,
      createdAt,
    } = tour);

    fName = creatorName?.split(' ')[0];
    lName = creatorName?.split(' ')[1];
  }

  useEffect(() => {
    if (tourId) {
      // When this component loads. This thunk dispatch will bring this tour's
      // data from the server and put it in the store variable called "tour".
      // Which we will then bring in to this component via useSelector.
      dispatch(getTourThunk(tourId));
    }
  }, []);

  useEffect(() => {
    // We also want to get the creator's profile then.
    // So if client clicks on user's name, we redirect to their profile page, with details already available to us.
    // AND this came about bcoz we mostly needed creator's profile to get their avatar.
    dispatch(getUserByIdThunk(tour?.creatorId));
  }, []);

  return (
    <section className="tourDetailsSection">
      {tour && (
        <div className="tourDetails">
          <div className="tourDetails-image__container">
            <img src={image} alt={title} className="image__container-heroImg" />

            <p className="createdAt">
              <img src={cameraIcon} alt={formattedDate(createdAt)} />
              {formattedDate(createdAt)}
            </p>

            <Link to={`/user/${currentUser?._id}`} className="tourDetails-creatorName">
              <img src={currentUser?.profileImageUrl} alt="" />
              <div>
                <p>{fName}</p>
                <p>{lName}</p>
              </div>
            </Link>

            {/* <div className="image__container-likesContainer"> */}
            {/* <img src={heartIconFilled} className="image__container-likeBtn" alt="" /> */}
            {/* <p className="likeCount">{likeCount}</p> */}
            {/* </div> */}
          </div>

          <div className="tourDetails-textBody">
            <div className="textBody-title-and-tags">
              <p className="title">{title}</p>
              <p className="tags">
                {tags.map((tag) => {
                  return `#${tag} `;
                })}
              </p>
            </div>

            <span className="textBody-description">{description}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default TourDetails;
