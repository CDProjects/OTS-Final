import React, { useEffect } from 'react';
import './Contact.css';
import otsShieldLogo from '../Images/OTS Shield Logo.png';

const Contact = () => {
  useEffect(() => {
    // Add 'contact-page' class to body when component mounts
    document.body.classList.add('contact-page');

    // Clean up function
    return () => {
      // Remove 'contact-page' class from body when component unmounts
      document.body.classList.remove('contact-page');
    };
  }, []);

  return (
    <section id="contact-section" className="contact-section">
      <div className="content-container">
        <h1 className="section-title">CONTACT</h1>
        <div className="contact-info">
          <h3><i>For new people/players, contact our Chairman directly</i></h3>
          <h3>Old Town Shamrocks Rugby Club ry</h3>
          <p>Kirkkokatu 1A 1b</p>
          <p>06100 Porvoo, Finland</p>
          <p><strong>Chairman:</strong> Stefan Rogers <a href="tel:+358408655733">+358 40 8655733</a></p>
          <p><strong>Club Email:</strong> <a href="mailto:porvoo@finland.rugby">porvoo@finland.rugby</a></p>
        </div>
        <img src={otsShieldLogo} alt="OTS Shield Logo" className="contact-image" />
      </div>
    </section>
  );
};

export default Contact;