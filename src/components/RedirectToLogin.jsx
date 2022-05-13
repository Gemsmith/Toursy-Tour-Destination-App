import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToLogin = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    if (count === 0) {
      clearInterval(interval); // stop the interval here & below as well to make it double sure. This is not a best practice I'd say.
      navigate('/login');
    }
    return () => clearInterval(interval);
  }, [count]);

  return (
    <section className="">Login required! Redirecting in {count} seconds ...</section>
  );
};

export default RedirectToLogin;
