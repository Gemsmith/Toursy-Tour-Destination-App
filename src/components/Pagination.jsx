import '../sass/components/Pagination.scss';

const Pagination = ({ currentPage, setCurrentPageValue, numberOfPages, dispatch }) => {
  const renderPagination = () => {
    if (currentPage === 1 && numberOfPages === 1) {
      // Means there's 1 page only and we're on it
      return null;
    }

    if (currentPage === 1) {
      // On first Page + More than 1 pages are there, bcoz if there was only 1 page, above "if" will handle it

      return (
        <>
          <button className="prev-page-button">Prev</button>
          <div className="pagenumber">
            Page {currentPage}/{numberOfPages}
          </div>
          <button
            className="next-page-button"
            onClick={() => dispatch(setCurrentPageValue(currentPage + 1))}
          >
            Next
          </button>
        </>
      );
    } else if (currentPage !== numberOfPages) {
      // Means im middle
      return (
        <>
          <button
            className="prev-page-button"
            onClick={() => dispatch(setCurrentPageValue(currentPage - 1))}
          >
            Prev
          </button>
          <div className="pagenumber">
            Page {currentPage}/{numberOfPages}
          </div>
          <button
            className="next-page-button"
            onClick={() => dispatch(setCurrentPageValue(currentPage + 1))}
          >
            Next
          </button>
        </>
      );
    } else if (currentPage === numberOfPages) {
      // Last page
      return (
        <>
          <button
            className="prev-page-button"
            onClick={() => dispatch(setCurrentPageValue(currentPage - 1))}
          >
            Prev
          </button>
          <div className="pagenumber">
            Page {currentPage}/{numberOfPages}
          </div>
          <button className="next-page-button">Next</button>
        </>
      );
    }
  };

  return <div className="pagination">{renderPagination()}</div>;
};

export default Pagination;
