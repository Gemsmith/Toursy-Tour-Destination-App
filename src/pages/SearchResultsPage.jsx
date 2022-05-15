import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import Card from '../components/Card';
import '../sass/pages/SearchResultsPage.scss';
const SearchResultsPage = () => {
  // Need query params to populate the search field if reloaded the page.
  const [queryParams, setQueryParams] = useSearchParams();
  const searchQuery = queryParams.get('searchQuery');

  // On search, search results are stored in the redux store as searchedTours.
  const { searchedTours } = useSelector((state) => state.tour);

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
              searchedTours.map((tour, index) => <Card key={index} {...tour} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
