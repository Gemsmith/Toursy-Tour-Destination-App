import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getToursByTagThunk } from '../redux/features/tourSlice';
import SpinnerLoader from '../components/Spinner';
import '../sass/pages/TaggedTours.scss';
import Card from '../components/Card';
import RelatedTourCard from '../components/RelatedTourCard';
const TaggedTours = () => {
  const dispatch = useDispatch();

  const { taggedTours, loading } = useSelector((state) => state.tour);

  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getToursByTagThunk(tag));
    }
    // eslint-disable-next-line
  }, [tag]);

  return loading ? (
    <SpinnerLoader />
  ) : (
    <section className="taggedTours">
      <h1 className="taggedTours-heading">Showing tours with tag '{tag}':</h1>

      <div className="taggedTours-container">
        {taggedTours?.length === 0 ? (
          <p>
            No tours found! Click <Link to="/addtour">here</Link> to start creating
            memories!
          </p>
        ) : (
          <div className="taggedTours-container-grid">
            {taggedTours &&
              taggedTours.map((tour, index) => <RelatedTourCard key={index} {...tour} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default TaggedTours;
