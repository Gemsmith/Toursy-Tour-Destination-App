import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserValue } from '../redux/features/authSlice';
import '../sass/components/Navbar.scss';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    window.open('http://localhost:5000/auth/logout', '_self');
    dispatch(setUserValue(null));
    localStorage.removeItem('user');
    // remove the user from redux store
    // remove the user from localStorage
  };

  // Menu Toggle Functionality:
  const avatarMenuElRef = useRef();
  const avatarBtnElRef = useRef();
  const hamburgerMenuElRef = useRef();
  const hamburgerBtnElRef = useRef();

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
          {/* Desktop View - Nav Links */}
          <div className="navbar__desktop-links">
            <Link className="navLinks clr-black" to="/">
              Home
            </Link>

            {/* <Link className="navLinks clr-black" to="/about">
              About
            </Link> */}
            {user === null || user === undefined || user === '' ? (
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
                {/* Desktop View - User Avatar */}
                <Link className="navLinks clr-black" to="/addTour">
                  Add Tour
                </Link>
                <Link className="navLinks clr-black" to="/dashboard">
                  Dashboard
                </Link>

                <span className="navbar__userAvatar">
                  <button
                    ref={avatarBtnElRef}
                    className="avatarPic"
                    onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                  >
                    <img
                      className=""
                      src={user?.profileImageUrl}
                      referrerPolicy="no-referrer"
                      alt=""
                    />

                    {avatarMenuOpen && (
                      <ul className="avatarMenu avatarMenuDesktop">
                        <li>
                          <b>{user?.name}</b>
                        </li>

                        <li>{user?.email}</li>

                        <li>
                          <button onClick={() => logout()} className="navBtn ">
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </button>
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
          className={`navbar__hamburger-btn ${
            !menuOpen ? 'clr-black' : 'clr-blue'
          } `}
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
            <>
              <Link className="navLinks clr-black" to="/">
                Home
              </Link>
              <Link className="navLinks clr-black" to="/about">
                About
              </Link>
            </>

            {user === null || user === undefined || user === '' ? (
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
                {/* Mobile View - User Avatar */}
                <ul className="avatarMenu avatarMenuMobile">
                  <div className="avatarMenuMobile__top">
                    <div className="avatarMenuMobile__top-text">
                      <li>
                        <b>{user?.name}</b>
                      </li>

                      <li>{user?.email}</li>
                    </div>

                    <li>
                      <img
                        className=""
                        src={user?.profileImageUrl}
                        referrerPolicy="no-referrer"
                        alt=""
                      />
                    </li>
                  </div>

                  <li>
                    <button onClick={() => logout()} className="navBtn ">
                      Logout
                    </button>
                  </li>
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
