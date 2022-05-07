import React from 'react';
import '../sass/components/Spinner.scss';

const Spinner = () => {
  return (
    <section>
      <div class="loader loader-1">
        <div class="loader-outter"></div>
        <div class="loader-inner"></div>
      </div>
    </section>
  );
};

export default Spinner;
