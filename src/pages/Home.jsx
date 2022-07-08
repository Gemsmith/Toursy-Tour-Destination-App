import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import { getAllToursThunk, setCurrentPageValue } from '../redux/features/tourSlice';
import SpinnerLoader from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import '../sass/pages/Home.scss';
import Pagination from '../components/Pagination';
import { motion } from 'framer-motion';

const Home = () => {
  const { allTours, loading, currentPage, numberOfPages } = useSelector(
    (state) => state.tour
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/tour?page=${currentPage}`);
    dispatch(getAllToursThunk(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return loading ? (
    <SpinnerLoader />
  ) : (
    <section className="home">
      <motion.div
        whileInView={{ y: [50, 0], opacity: [0, 1] }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="home-tours__container"
      >
        {allTours?.length === 0 ? (
          <p>
            No tours found! Click <Link to="/addtour">here</Link> to start creating
            memories!
          </p>
        ) : (
          <div className="home-tours__container-grid">
            {/* {allTours && allTours.map((tour, index) => <Card key={index} {...tour} />)} */}
            {allTours &&
              allTours.map((tour, index) => {
                return (
                  <motion.div
                    whileInView={{
                      scale: [0.9, 1],
                      opacity: [0, 1],
                      y: [100, 0],
                      transition: { delay: 0.1 * index },
                    }}
                    key={index}
                  >
                    <Card {...tour} />
                  </motion.div>
                );
              })}
          </div>
        )}
      </motion.div>
      {allTours?.length > 0 && (
        <Pagination {...{ currentPage, setCurrentPageValue, numberOfPages, dispatch }} />
      )}
    </section>
  );
};

export default Home;
