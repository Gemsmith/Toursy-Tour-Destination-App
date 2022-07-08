import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getRelatedToursThunk, getTourThunk } from '../redux/features/tourSlice';
import { formattedDate } from '../utils/dateFormatter';
import '../sass/pages/TourDetails.scss';
import cameraIcon from '../assets/svg/camera-icon.svg';
import { getUserByIdThunk } from '../redux/features/userSlice';
import RelatedTourCard from '../components/RelatedTourCard';
import DisqusThread from '../components/DisqusThread';
import SpinnerLoader from '../components/Spinner';

const TourDetails = () => {
  const dispatch = useDispatch();
  const tourId = useParams().id;

  const { tour } = useSelector((state) => state.tour);
  const { relatedTours, loading } = useSelector((state) => state.tour);

  const { currentUser } = useSelector((state) => state.user);

  const [profilePic, setProfilePic] = useState('');
  const [loadComments, setLoadComments] = useState(false);

  let title,
    description,
    tags,
    image,
    creatorName,
    creatorId,
    likes,
    createdAt,
    fName,
    lName;

  if (tour) {
    // Removed bcoz of unused but "_id" is also available from "tour" to be destructured if needed
    ({ title, description, tags, image, creatorName, creatorId, likes, createdAt } =
      tour);

    fName = creatorName?.split(' ')[0];
    lName = creatorName?.split(' ')[1];
  }

  const handleLoadComments = () => {
    setLoadComments(!loadComments);
  };

  // Load the creator's profile  - This action is only needed to display creator's profile pic
  useEffect(() => {
    setTimeout(() => {
      tags && dispatch(getRelatedToursThunk(tags));
    }, 2000);

    // REMOVING THIS FEATURE - Because it is making the app really hang when TourDetails page (this comp.) is rendered.
    // Also react-persist warning is appearing in the console - [Violation] 'setInterval' handler took 50ms (createPersistoid.js:57)
    // So the slowdown might be caused by that as well.

    // If the opened tour is the one created by the loggedInUser, then we'll fetch the profile image from localStorage, otherwise,
    // fetch the userById of creator of post, and set their profile object in currentUser at redux state.
    // if (tour && currentUser && tour._id === tourId) {
    dispatch(getUserByIdThunk(tour?.creatorId)); // fetch the creator and set them in currentUser
    // if (tour.creatorId !== currentUser._id) {
    // means creator is the loggedin user themself
    // if (loggedInUser && tour?.creatorId === loggedInUser?._id) {
    //   setProfilePic(loggedInUser?.profileImage);
    //   // means creator is a user other than then loggedin user
    // } else {
    //   setProfilePic(currentUser?.profileImage);
    // }

    setProfilePic(currentUser?.profileImage);

    // eslint-disable-next-line
  }, [tour, profilePic]);

  // Load the current Tour
  useEffect(() => {
    if (tourId) {
      // When this component loads. This thunk dispatch will bring this tour's
      // data from the server and put it in the store variable called "tour".
      // Which we will then bring in to this component via useSelector.
      dispatch(getTourThunk(tourId));
    }
    // eslint-disable-next-line
  }, [tourId]);

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

  // In the relatedTours, this tour (i.e. the current clicked tour) will also be present, because it also has the tag for which related tours are fetched.
  // So we need to filter and remove the current tour from the relatedTours.
  // Also we only need at max 4 related tours. So we slice the array.
  const relatedToursArr = relatedTours.filter((tour) => tour._id !== tourId).slice(0, 4);

  return (
    <section className="tourDetailsSection">
      {tour && (
        <>
          <div className="tourDetails">
            <div className="tourDetails-image__container">
              <img
                src={image}
                alt={title}
                className="image__container-heroImg"
                loading="lazy"
              />

              <p className="createdAt">
                <img src={cameraIcon} alt={formattedDate(createdAt)} loading="lazy" />
                {formattedDate(createdAt)}
              </p>

              <Link to={`/user/${creatorId}`} className="tourDetails-creatorName">
                <img src={currentUser?.profileImage} alt="" loading="lazy" />

                <div>
                  <p>{fName}</p>
                  <p>{lName}</p>
                </div>
              </Link>

              <p className="likesCount">
                <b> {likes?.length} </b>
                Likes
              </p>
            </div>

            <div className="tourDetails-textBody">
              <div className="textBody-title-and-tags">
                <p className="title">{title}</p>
                <p className="tags">
                  {tags &&
                    tags.map((tag, index) => {
                      return (
                        <Link key={index} to={`/tour/tag/${tag} `}>
                          #{tag}{' '}
                        </Link>
                      );
                    })}
                </p>
              </div>

              <span className="textBody-description">{description}</span>
            </div>
          </div>

          <div className="tourDetails__relatedTours">
            <h1 className="relatedTours-heading">Related Tours</h1>

            {loading && <SpinnerLoader />}

            {!loading && relatedToursArr?.length === 0 && (
              <p className="relatedTours-noToursFound">
                No related tours found! Click <Link to="/addTour">here</Link> to start
                creating memories!
              </p>
            )}

            {!loading && relatedToursArr?.length > 0 && (
              <div className="relatedTours-container-grid">
                {relatedToursArr &&
                  relatedToursArr.map((tour, index) => (
                    <RelatedTourCard key={index} {...tour} />
                  ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Comments - DISQUS */}
      <div className="tourDetails__comments">
        <button className="load-comments-btn" onClick={handleLoadComments}>
          {!loadComments ? 'Load Comments' : 'Hide Comments'}
        </button>

        {loadComments && (
          <DisqusThread id={tourId} title={title} path={`/tour/${tourId}`} />
        )}
      </div>
    </section>
  );
};

export default TourDetails;
