import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../Images/OTS Logo black.jpg'; // Adjust the path as needed

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMediumDevice, setIsMediumDevice] = useState(window.innerWidth >= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMediumDevice(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { to: '/', text: 'HOME', id: 'home-link' },
    { to: '/news', text: 'NEWS', id: 'news-link' },
    { to: '/team', text: 'TEAM', id: 'team-link' },
    { to: '/training', text: 'TRAINING', id: 'training-link' },
    { to: '/juniors', text: 'JUNIORS', id: 'juniors-link' },
    { to: '/touch', text: 'TOUCH', id: 'touch-link' },
    { to: '/fixtures', text: 'RESULTS & FIXTURES', id: 'fixtures-link' },
    { to: '/media-recruitment', text: 'MEDIA & RECRUITMENT', id: 'media-recruitment-link' },
    { to: '/contact', text: 'CONTACT', id: 'contact-link' },
  ];

  return (
    <>
      {!isMediumDevice && (
        <div className="nav-bar">
          <div className={`sub-menus ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link to={item.to} id={item.id} onClick={toggleMenu}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="logo-title">
            <img src={logo} alt="Old Town Shamrocks Logo" className="logo" />
            <div className="title-container">
              <h1>Old Town Shamrocks</h1>
            </div>
          </div>
          <div className={`icon-burger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      )}
      {isMediumDevice && (
        <>
          <div className="nav-bar-medium">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link to={item.to} id={item.id}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {location.pathname === '/' && (
            <div className="home-club-medium">
              <img src={logo} alt="Old Town Shamrocks Logo" className="home-image-medium" />
              <div className="title-container">
                <h1>Old Town Shamrocks</h1>
                <h2 className="subtitle">Porvoo Rugby Club</h2>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Navbar;