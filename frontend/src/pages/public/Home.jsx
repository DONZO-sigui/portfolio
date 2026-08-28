import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import api from '../../services/api';

import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import TestimonialFeed from '../../components/TestimonialFeed';
import ContactForm from '../../components/ContactForm';
import TestimonialForm from '../../components/TestimonialForm';

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    const fetchData = async () => {
      try {
        const testRes = await api.get('/testimonials');
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

      {/* About Section */}
      <section id="about" className="py-5 bg-white">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">À Propos</h2>
          <div className="row justify-content-center mt-4">
            <div className="col-lg-10 text-center" data-aos="fade-up" data-aos-delay="100">
              <p className="lead text-muted">
                Jeune diplômé en informatique (Licence) de l'Université Gamal Abdel Nasser de Conakry, 
                je suis profondément passionné par le développement, les réseaux et les systèmes.
              </p>
              <p className="text-muted">
                Mon parcours académique et mes projets personnels m'ont permis de développer une polyvalence technique allant de la conception d'API REST (Backend) à l'administration de systèmes Linux, en passant par la configuration de réseaux complexes et l'expérimentation IoT (ESP32). Je suis motivé par la résolution de problèmes et j'ai pour objectif de devenir un ingénieur complet, capable de concevoir des architectures robustes et sécurisées de bout en bout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Mes Compétences</h2>
          <div className="row mt-5 g-4 justify-content-center">
            
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100 border-0 shadow-sm p-4">
                <h4 className="text-primary mb-3"><i className="bi bi-code-slash me-2"></i>Développement</h4>
                <ul className="list-unstyled text-muted">
                  <li><i className="bi bi-check2 text-success me-2"></i>Python & Django</li>
                  <li><i className="bi bi-check2 text-success me-2"></i>Node.js & Express.js</li>
                  <li><i className="bi bi-check2 text-success me-2"></i>HTML & CSS</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100 border-0 shadow-sm p-4">
                <h4 className="text-primary mb-3"><i className="bi bi-server me-2"></i>Backend & BDD</h4>
                <ul className="list-unstyled text-muted">
                  <li><i className="bi bi-check2 text-success me-2"></i>PostgreSQL & SQL</li>
                  <li><i className="bi bi-check2 text-success me-2"></i>REST API</li>
                  <li><i className="bi bi-check2 text-success me-2"></i>Architecture Backend</li>
                  <li><i className="bi bi-check2 text-success me-2"></i>JSON, JWT & Auth</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="card h-100 border-0 shadow-sm p-4">
                <h4 className="text-primary mb-3"><i className="bi bi-hdd-network me-2"></i>Systèmes & Réseaux</h4>
                <ul className="list-unstyled text-muted">
                  <li><i className="bi bi-check2 text-success me-2"></i>Linux (Administration & CLI)</li>
                  <li><i className="bi bi-check2 text-success me-2"></i>TCP/IP, VLAN, Routage</li>
                  <li><i className="bi bi-check2 text-success me-2"></i>Cisco Packet Tracer</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="400">
              <div className="card h-100 border-0 shadow-sm p-4">
                <h4 className="text-primary mb-3"><i className="bi bi-cpu me-2"></i>IoT & Outils</h4>
                <ul className="list-unstyled text-muted">
                  <li><i className="bi bi-check2 text-success me-2"></i>ESP32, Arduino, Capteurs (GPS, GSM...)</li>
                  <li><i className="bi bi-check2 text-success me-2"></i>Git & GitHub</li>
                  <li><i className="bi bi-check2 text-success me-2"></i>VS Code</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-5 bg-white">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Projets & Réalisations</h2>
          <div className="row mt-5 g-4">
            
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="card-title text-primary">Station IoT Environnementale</h4>
                  <h6 className="card-subtitle mb-3 text-muted">ESP32 • Capteurs • Backend</h6>
                  <p className="card-text text-muted small">
                    Système de collecte de données environnementales (température, pH, turbidité, GPS, GSM) basé sur ESP32, avec affichage OLED et transmission vers une base PostgreSQL via API REST.
                  </p>
                </div>
                <div className="card-footer bg-white border-0 px-4 pb-4 pt-0">
                  <a href="#" className="btn btn-sm btn-outline-primary">Voir sur GitHub</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="card-title text-primary">Portfolio Dynamique</h4>
                  <h6 className="card-subtitle mb-3 text-muted">React • Node.js • PostgreSQL</h6>
                  <p className="card-text text-muted small">
                    Développement complet de ce portfolio avec un backend robuste (Node.js/Express) pour la gestion dynamique des contacts et des témoignages.
                  </p>
                </div>
                <div className="card-footer bg-white border-0 px-4 pb-4 pt-0">
                  <a href="#" className="btn btn-sm btn-outline-primary">Voir sur GitHub</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="card-title text-primary">Architecture Réseau d'Entreprise</h4>
                  <h6 className="card-subtitle mb-3 text-muted">Cisco Packet Tracer • VLAN</h6>
                  <p className="card-text text-muted small">
                    Conception et simulation complète d'une infrastructure réseau sécurisée. Implémentation de VLANs, routage inter-VLAN et politiques de sécurité.
                  </p>
                </div>
                <div className="card-footer bg-white border-0 px-4 pb-4 pt-0">
                  <a href="#" className="btn btn-sm btn-outline-primary">Détails</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Parcours Académique</h2>
          <div className="row justify-content-center mt-4">
            <div className="col-md-8" data-aos="fade-up">
              <div className="card border-0 shadow-sm p-4 text-center">
                <h3 className="text-primary mb-2">Diplôme de Licence en Informatique / NTIC</h3>
                <h5 className="text-muted mb-4">UGANC — Université Gamal Abdel Nasser de Conakry</h5>
                <span className="badge bg-success text-white px-3 py-2 fs-6">Diplômé</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-5 bg-white">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Recommandations & Avis</h2>
          
          <div className="row justify-content-center mt-4">
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
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Contactez-Moi</h2>
          <div className="row justify-content-center mt-4">
            <div className="col-lg-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-custom text-center">
        <div className="container">
          <p className="mb-0">&copy; {new Date().getFullYear()} Sigui Donzo | donzosd63@gmail.com | Tel: 623 713 713</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
