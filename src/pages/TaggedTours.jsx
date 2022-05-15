import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getToursByTagThunk } from '../redux/features/tourSlice';
import SpinnerLoader from '../components/Spinner';
import '../sass/pages/TaggedTours.scss';
import Card from '../components/Card';
const TaggedTours = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { taggedTours, loading } = useSelector((state) => state.tour);

  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getToursByTagThunk(tag));
    }
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
              taggedTours.map((tour, index) => <Card key={index} {...tour} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default TaggedTours;
