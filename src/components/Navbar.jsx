import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoggedInUserValue } from '../redux/features/userSlice';
import {
  getToursBySearchThunk,
  setAllToursValue,
  setCurrentPageValue,
  setTourValue,
} from '../redux/features/tourSlice';
import '../sass/components/Navbar.scss';
import searchIcon from '../assets/svg/search-icon.svg';
import { toast } from 'react-toastify';
import { formattedDate } from '../utils/dateFormatter';
import { logoutThunk } from '../redux/features/authSlice';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const { loggedInUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutThunk());
  };

  // Menu Toggle Functionality:
  const avatarMenuElRef = useRef();
  const avatarBtnElRef = useRef();
  const hamburgerMenuElRef = useRef();
  const hamburgerBtnElRef = useRef();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Do something with searchTerm
    console.log(searchTerm);
    if (searchTerm) {
      dispatch(getToursBySearchThunk(searchTerm));
      navigate(`/tour/search?searchQuery=${searchTerm}`);
    } else {
      toast('Please enter a search term');
    }
  };

  useEffect(() => {
    let handler = (event) => {
      // Avatar Menu - Outside Click Toggle Logic
      if (
        !avatarMenuElRef.current?.contains(event.target) &&
        !avatarBtnElRef.current?.contains(event.target)
      ) {
        // setAvatarMenuOpen(false);
        setAvatarMenuOpen(false);
      }

      // Hamburger Menu - Outside Click toggle Logic
      if (
        !hamburgerMenuElRef.current?.contains(event.target) &&
        !hamburgerBtnElRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);

    // This is a cleanup function, to prevent memory leaks
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div className="navbar">
      {/* Navbar - Desktop */}
      <div className="navbar__desktop">
        {/* Site Logo */}
        <Link to="/" className="navbar__logo-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        </Link>

        {/* Nav Links + User Avatar */}
        <nav className="navbar__desktop-links-and-avatar">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Search Tours"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <img src={searchIcon} alt="" />
            </button>
          </form>

          {/* Desktop View - Nav Links */}
          {/* On click will always make sure click on Home brings us back to page 1 */}
          <div className="navbar__desktop-links">
            <Link
              className="navLinks clr-black"
              to="/"
              onClick={() => dispatch(setCurrentPageValue(1))}
            >
              Home
            </Link>

            {/* <Link className="navLinks clr-black" to="/about">
              About
            </Link> */}
            {loggedInUser === null ||
            loggedInUser === undefined ||
            loggedInUser === '' ? (
              <>
                <Link className="navLinks clr-blue" to="/login">
                  Login
                </Link>
                <Link className="navLinks clr-blue" to="/signup">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link className="navLinks clr-black" to="/addTour">
                  Add Tour
                </Link>
                <Link className="navLinks clr-black" to={`/user/${loggedInUser._id}`}>
                  Profile
                </Link>
                <Link className="navLinks clr-black" to="/dashboard">
                  Dashboard
                </Link>

                {/* Desktop View - User Avatar */}
                <span className="navbar__userAvatar">
                  <div
                    ref={avatarBtnElRef}
                    className="avatarPic"
                    onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                  >
                    <img
                      className=""
                      src={loggedInUser?.profileImageUrl}
                      referrerPolicy="no-referrer"
                      alt=""
                    />

                    {avatarMenuOpen && (
                      <ul className="avatarMenu avatarMenuDesktop">
                        <li>
                          <Link to={`/user/${loggedInUser._id}`}>
                            <b>{loggedInUser?.name}</b>
                          </Link>
                        </li>

                        <li>
                          <Link to={`/user/${loggedInUser._id}`}>
                            {loggedInUser?.email}
                          </Link>
                        </li>

                        <li>
                          <button onClick={() => logout()} className="navBtn ">
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </span>
              </>
            )}
          </div>
        </nav>

        {/* Hamburger Button */}
        <button
          ref={hamburgerBtnElRef}
          type="button"
          aria-label="Toggle mobile menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`navbar__hamburger-btn ${!menuOpen ? 'clr-black' : 'clr-blue'} `}
        >
          <svg
            className={`${menuOpen ? 'svg-fill-salmon' : ''}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Navbar - Mobile */}
      {menuOpen && (
        <nav className="navbar__mobile" ref={hamburgerMenuElRef}>
          {/* Mobile View - Nav Links */}
          {/* <div className="navbar__mobile-navLinks">{navLinks}</div> */}
          <div className="navbar__mobile-navLinks">
            <Link className="navLinks clr-black" to="/">
              Home
            </Link>

            {loggedInUser === null ||
            loggedInUser === undefined ||
            loggedInUser === '' ? (
              <>
                <Link className="navLinks clr-blue" to="/login">
                  Login
                </Link>
                <Link className="navLinks clr-blue" to="/signup">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link className="navLinks clr-black" to="/addTour">
                  Add Tour
                </Link>
                <Link className="navLinks clr-black" to="/dashboard">
                  Dashboard
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search Tours"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="search-btn">
                    <img src={searchIcon} alt="" />
                  </button>
                </form>

                {/* Mobile View - User Avatar */}
                <ul className="avatarMenu avatarMenuMobile">
                  <li>
                    <button onClick={() => logout()} className="navBtn ">
                      Logout
                    </button>
                  </li>

                  <div className="avatarMenuMobile__top">
                    <div className="avatarMenuMobile__top-text">
                      <li>
                        <Link to={`/user/${loggedInUser.id}`}>
                          <b>{loggedInUser?.name}</b>
                        </Link>
                      </li>

                      <li>
                        <Link to={`/user/${loggedInUser.id}`}>{loggedInUser?.email}</Link>
                      </li>
                    </div>

                    <li>
                      <img
                        className=""
                        src={loggedInUser?.profileImageUrl}
                        referrerPolicy="no-referrer"
                        alt=""
                      />
                    </li>
                  </div>
                </ul>
              </>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
