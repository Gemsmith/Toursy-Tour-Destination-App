import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import { getAllToursThunk, setCurrentPageValue } from '../redux/features/tourSlice';
import SpinnerLoader from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import '../sass/pages/Home.scss';
import Pagination from '../components/Pagination';

const Home = () => {
  const { allTours, loading, currentPage, numberOfPages } = useSelector(
    (state) => state.tour
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Just adding this logic by myself: Add a pane no. in the query string in url path in address bar
  // On pages where pagination comp. loads, useEffect will take whatever pageNo. is there in url
  // set it in currentPage, which will load 'Home' comp. in the browser. Since on change in currentPage,
  // a re-render is done (bcoz), it is added as a dependency in "Home" comp.'s useEffect.
  // NEED TO LEARN how we can make it so that if user manually enters a page number inthe address bar, that page should load.
  // Right now using the setCurrentPageValue(), is causing infinite re-renders. Whereas we can successfully do the
  // same via the pagination's next and prev buttons. No idea why it's causing infinite loop.
  // Catch pagenumber from url's query params below:
  // const [page, setPageParams] = useSearchParams();
  // const pageNumber = page.get('page');

  useEffect(() => {
    navigate(`/tour?page=${currentPage}`);
    dispatch(getAllToursThunk(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
      {allTours?.length > 0 && (
        <Pagination {...{ currentPage, setCurrentPageValue, numberOfPages, dispatch }} />
      )}
    </section>
  );
};

export default Home;
