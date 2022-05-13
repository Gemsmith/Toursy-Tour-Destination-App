import React from 'react';
import '../sass/components/Spinner.scss';

const Spinner = () => {
  return (
    <section className="spinner">
      <div className="loader loader-1">
        <div className="loader-outter"></div>
        <div className="loader-inner"></div>
      </div>
    </section>
  );
};

export default Spinner;
