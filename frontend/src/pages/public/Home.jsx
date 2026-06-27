import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import api from '../../services/api';

import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import StatCard from '../../components/StatCard';
import MediaGallery from '../../components/MediaGallery';
import CollabCard from '../../components/CollabCard';
import TestimonialFeed from '../../components/TestimonialFeed';
import ContactForm from '../../components/ContactForm';
import TestimonialForm from '../../components/TestimonialForm';

const Home = () => {
  const [stats, setStats] = useState([]);
  const [medias, setMedias] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    const fetchData = async () => {
      try {
        const [statsRes, mediasRes, collabsRes, testRes] = await Promise.all([
          api.get('/statistics'),
          api.get('/medias'),
          api.get('/collaborations'),
          api.get('/testimonials')
        ]);
        if (statsRes.data) setStats(statsRes.data);
        setMedias(mediasRes.data || []);
        setCollabs(collabsRes.data || []);
        setTestimonials(testRes.data || []);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [reloadTrigger]);

  return (
    <div>
      <Navbar />
      <Hero />

      {/* Statistics Section */}
      <section id="stats" className="py-5 bg-white">
        <div className="container">
          {/* MODIFICATION ICI : Titre de la section Statistiques */}
          <h2 className="section-title" data-aos="fade-up">Mes Statistiques</h2>
          <div className="row justify-content-center g-4 mt-2">
            {stats.length > 0 ? (
              stats.map((stat, index) => (
                <StatCard key={stat.id} stat={stat} delay={index * 100} />
              ))
            ) : (
              <p className="text-center text-muted">Aucune statistique disponible.</p>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio/Gallery Section */}
      <section id="portfolio" className="py-5 bg-light">
        <div className="container">
          {/* MODIFICATION ICI : Titre de la section Galerie/Médias */}
          <h2 className="section-title" data-aos="fade-up">Mon Portfolio</h2>
          <MediaGallery medias={medias} />
        </div>
      </section>

      {/* Collaborations Section */}
      <section id="collabs" className="py-5 bg-white">
        <div className="container">
          {/* MODIFICATION ICI : Titre de la section Collaborations */}
          <h2 className="section-title" data-aos="fade-up">Mes Partenaires</h2>
          <div className="row mt-4">
            {collabs.length > 0 ? (
              collabs.map((collab, index) => (
                <CollabCard key={collab.id} collab={collab} delay={index * 100} />
              ))
            ) : (
              <p className="text-center text-muted">Aucune collaboration à afficher.</p>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-5 bg-light">
        <div className="container">
          {/* MODIFICATION ICI : Titre de la section Témoignages */}
          <h2 className="text-center mb-5" data-aos="fade-up">Faites parler vos avis!</h2>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <TestimonialFeed testimonials={testimonials} />
              
              <div className="mt-4">
                <TestimonialForm onTestimonialAdded={() => setReloadTrigger(prev => prev + 1)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-white">
        <div className="container">
          {/* MODIFICATION ICI : Titre de la section Contact */}
          <h2 className="section-title" data-aos="fade-up">Contactez-Moi</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-custom text-center">
        <div className="container">
          {/* MODIFICATION ICI : Texte du bas de page (Copyright) */}
          <p className="mb-0">&copy; {new Date().getFullYear()} josephmaximebilivogui@gmail.com<br />Tel: </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
