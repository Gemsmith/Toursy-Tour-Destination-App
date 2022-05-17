import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTourThunk, getUsersToursThunk } from '../redux/features/tourSlice';
import { Link } from 'react-router-dom';
import SpinnerLoader from '../components/Spinner';
import '../sass/pages/Dashboard.scss';
import Card from '../components/Card';
import editIcon from '../assets/svg/edit-icon.svg';
import trashIcon from '../assets/svg/trash-icon.svg';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.user);
  const { usersTours, loading } = useSelector((state) => state.tour);

  const userId = loggedInUser?._id;

  const handleDeleteTour = (tourId) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      dispatch(deleteTourThunk(tourId));
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUsersToursThunk(userId));
    }
  }, []);

  return loading ? (
    <SpinnerLoader />
  ) : (
    <section className="dashboard">
      <div className="dashboard-tours__container">
        {usersTours?.length === 0 ? (
          <p className="dashboard-tours__container-no-tours-found">
            No tours found! Click <Link to="/addtour">here</Link> to start creating
            memories!
          </p>
        ) : (
          <div className="dashboard-tours__container-grid">
            {usersTours &&
              usersTours.map((tour, index) => (
                <div key={index} className="card__wrapper">
                  <Card key={index} {...tour} />

                  <div className="card__wrapper-buttons__container">
                    <Link to={`/editTour/${tour._id}`}>
                      <img src={editIcon} alt="" className="svg-icons" />
                    </Link>
                    <button onClick={() => handleDeleteTour(tour._id)}>
                      <img src={trashIcon} alt="" className="svg-icons" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
