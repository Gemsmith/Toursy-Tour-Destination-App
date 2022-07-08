import '../sass/pages/NotFound.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <section className="notfound">
      <div className="notfound-text">
        <motion.p
          whileInView={{ y: [-50, 0], opacity: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="notfound-text-title"
        >
          404
        </motion.p>
        <p>We couldn't find this page...</p>
      </div>

      <div className="notfound-links">
        {/* Save Button */}
        <motion.div
          whileInView={{ x: [-50, 0], opacity: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          to="/"
          type="submit"
          className="homeBtn"
        >
          <Link to="/" type="submit">
            Go to Home
          </Link>
        </motion.div>

        {/* Reset/Clear Button */}
        <motion.div
          whileInView={{ x: [50, 0], opacity: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="loginBtn"
        >
          <Link to="/login" type="submit">
            Login
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
