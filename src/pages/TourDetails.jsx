import React, { useEffect, useLayoutEffect } from 'react';
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

  if (tour && tour._id === tourId) {
    if (tour.creatorId !== currentUser._id) {
      dispatch(getUserByIdThunk(tour?.creatorId));
    }
  }

  useEffect(() => {
    if (tourId) {
      // When this component loads. This thunk dispatch will bring this tour's
      // data from the server and put it in the store variable called "tour".
      // Which we will then bring in to this component via useSelector.
      dispatch(getTourThunk(tourId));
    }
  }, []);

  // We also want to get the creator's profile then.
  // And we need to do it in a seprate useEffect bcoz we need to put it as a dependency.
  // If we put it in the same useEffect as the dispatch(getTourThunk(tourId)) above, then it will be called every time the component loads and cause infinite re-renders, as the user is fetched and dep finds it replaced and re-renders and on and on.
  // So if client clicks on user's name, we redirect to their profile page, with details already available to us.
  // AND this came about bcoz we mostly needed creator's profile to get their avatar.
  // COULDN'T GET THIS TO WORK. It just didn't wanna dispatch this action to bring the current tour's creator's data.
  // And which means it always displayed the previous current user's image.
  // GOT IT TO WORK - Took the logic out of useEffect, and used if else to conditionally dispatch the action. Because we kwow tour will be fetched definately.
  // So when it is fetched, comp. re-renders and goes further into the if loop. And after certain time executes the dispatch.
  // Which makes sure we get the updated value of currentUser. Although it does result in a screen flash.
  //Also commenting the image below, because only that element was dependent on the current user.
  // useLayoutEffect(() => {
  //   if (tour) {
  //     console.log('tour', tour);
  //     dispatch(getUserByIdThunk(tour?.creatorId));
  //   }
  // }, []);

  return (
    <section className="tourDetailsSection">
      {/* Earlier it was only the "tour &&" check. But we've then also added a "creatorId === currentUser._id" here too, because the profilePic is being loaded from the "currentUser" in state. But that takes too long to update and meanwhile whatever user was store in it previously, thier profilePic appears in place of the actual current user. So we need to make sure that until the id of the tour creator and currentUser's _id match, the component is not loaded. */}
      {tour && (
        <div className="tourDetails">
          <div className="tourDetails-image__container">
            <img src={image} alt={title} className="image__container-heroImg" />

            <p className="createdAt">
              <img src={cameraIcon} alt={formattedDate(createdAt)} />
              {formattedDate(createdAt)}
            </p>

            <Link to={`/user/${creatorId}`} className="tourDetails-creatorName">
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
                  return <Link to={`/tour/tag/${tag} `}>#{tag} </Link>;
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
