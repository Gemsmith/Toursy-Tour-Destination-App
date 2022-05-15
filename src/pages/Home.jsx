import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import { getAllToursThunk } from '../redux/features/tourSlice';
import SpinnerLoader from '../components/Spinner';
import { Link } from 'react-router-dom';
import '../sass/pages/Home.scss';

const Home = () => {
  const { allTours, loading } = useSelector((state) => state.tour);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllToursThunk());
  }, []);

  return loading ? (
    <SpinnerLoader />
  ) : (
    <section className="home">
      <div className="home-tours__container">
        {allTours?.length === 0 ? (
          <p>
            No tours found! Click <Link to="/addtour">here</Link> to start creating
            memories!
          </p>
        ) : (
          <div className="home-tours__container-grid">
            {allTours && allTours.map((tour, index) => <Card key={index} {...tour} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
