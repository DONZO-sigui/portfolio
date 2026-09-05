import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa';

import bgImage from '../assets/profile.jpg';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container" data-aos="fade-up">
        
        <img src={bgImage} alt="Profil de Sigui Donzo" className="profile-img" />
        
        <h1>Bienvenue dans l'univers de<br/>Sigui Donzo</h1>
        
        <p className="lead mb-4 mx-auto" style={{ maxWidth: '800px' }}>
          Jeune diplômé en informatique, passionné par la création de solutions numériques, les systèmes Linux, l'IoT et les réseaux informatiques.
        </p>
        
        <div className="d-flex justify-content-center gap-4 mb-4">
          <a href="https://www.facebook.com/Donzolejeuneinformaticien?mibextid=ZbWKwL" target="_blank" rel="noreferrer" className="text-light fs-2 custom-hover"><FaFacebook /></a>
          <a href="https://wa.me/623713713" target="_blank" rel="noreferrer" className="text-light fs-2 custom-hover"><FaWhatsapp /></a>
          <a href="https://github.com/DonzoSigui" target="_blank" rel="noreferrer" className="text-light fs-2 custom-hover"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/donzo-sigui-0b0b0b/" target="_blank" rel="noreferrer" className="text-light fs-2 custom-hover"><FaLinkedin /></a>
        </div>
        
        <div className="d-flex justify-content-center gap-3">
          <a href="#projects" className="btn btn-outline-light px-4 py-2" style={{ borderRadius: '8px' }}>Mes Projets</a>
          <a href="#contact" className="btn btn-primary-custom">Me Contacter</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
