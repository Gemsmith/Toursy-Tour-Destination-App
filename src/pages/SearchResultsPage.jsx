import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import RelatedTourCard from '../components/RelatedTourCard';
import '../sass/pages/SearchResultsPage.scss';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { getToursBySearchThunk } from '../redux/features/tourSlice';

const SearchResultsPage = () => {
  // Need query params to populate the search field if reloaded the page.
  const [queryParams] = useSearchParams();
  const searchQuery = queryParams.get('searchQuery');
  // On search, search results are stored in the redux store as searchedTours.
  const { searchedTours } = useSelector((state) => state.tour);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchedTours.length === 0 && searchQuery !== '') {
      dispatch(getToursBySearchThunk(searchQuery));
    }
  }, [searchQuery]);

  return (
    <section className="search">
      <h1 className="search-heading">Search Results for '{searchQuery}':</h1>

      <div className="search-container">
        {searchedTours?.length === 0 ? (
          <p>
            No tours found! Click <Link to="/addtour">here</Link> to start creating
            memories!
          </p>
        ) : (
          <div className="seach-container-grid">
            {searchedTours &&
              searchedTours.map((tour, index) => (
                <motion.div
                  whileInView={{
                    scale: [0.9, 1],
                    opacity: [0, 1],
                    y: [100, 0],
                    transition: { delay: 0.1 * index },
                  }}
                  key={index}
                  className="card-container"
                >
                  <RelatedTourCard {...tour} />
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
