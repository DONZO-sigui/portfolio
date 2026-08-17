import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa';

import bgImage from '../assets/background.jpg';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container" data-aos="fade-up">
        
        <img src={bgImage} alt="Profil de Bilivogui Joseph Maxime" className="profile-img" />
        
        {/* MODIFICATION ICI : Remplacez par votre phrase d'accroche principale */}
        <h1>Bienvenue dans l'univers<br/>Bilivogui Joseph Maxime</h1>
        
        {/* MODIFICATION ICI : Remplacez par votre sous-titre ou votre niche (ex: Beauté, Sport, Tech) */}
        <p className="lead mb-4">Le monde des affaires</p>
        
        <div className="d-flex justify-content-center gap-3 mb-4">
          {/* MODIFICATION ICI : Mettez le lien de votre page Instagram à la place de "#" */}
          <a href="#" target="_blank" rel="noreferrer" className="text-light fs-3 custom-hover"><FaInstagram /></a>
          {/* MODIFICATION ICI : Mettez le lien de votre page TikTok à la place de "#" */}
          <a href="#" target="_blank" rel="noreferrer" className="text-light fs-3 custom-hover"><FaTiktok /></a>
          {/* MODIFICATION ICI : Mettez le lien de votre chaîne YouTube à la place de "#" */}
          <a href="#" target="_blank" rel="noreferrer" className="text-light fs-3 custom-hover"><FaYoutube /></a>
          <a href="#" target="_blank" rel="noreferrer" className="text-light fs-3 custom-hover"><FaWhatsapp /></a>
          <a href="https://www.facebook.com/share/1EDsi1yJZg/?mibextid=wwXlfr" target="_blank" rel="noreferrer" className="text-light fs-3 custom-hover"><FaFacebook /></a>
        </div>
        
        {/* MODIFICATION ICI : Vous pouvez changer le texte du bouton si besoin */}
        <a href="#contact" className="btn btn-primary-custom">Travaillons Ensemble</a>
      </div>
    </section>
  );
};

export default Hero;
