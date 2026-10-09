import React from 'react';
import Navbar from '../../components/Navbar';
import { FaDownload } from 'react-icons/fa';

const Resume = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />
      
      <div className="container flex-grow-1 d-flex flex-column py-5 mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary mb-0">Mon Curriculum Vitae</h2>
          <a 
            href="/CV_DONZO_SIGUI.pdf" 
            download="CV_DONZO_SIGUI.pdf"
            className="btn btn-primary-custom d-flex align-items-center gap-2 px-4 py-2"
          >
            <FaDownload /> Télécharger
          </a>
        </div>
        
        <div className="card border-0 shadow-sm flex-grow-1 overflow-hidden" style={{ minHeight: '75vh' }}>
          <object 
            data="/CV_DONZO_SIGUI.pdf" 
            type="application/pdf"
            width="100%" 
            height="100%"
            style={{ minHeight: '75vh' }}
          >
            <div className="text-center p-5">
              <p>Votre navigateur ne supporte pas l'affichage direct des PDF.</p>
              <a href="/CV_DONZO_SIGUI.pdf" download="CV_DONZO_SIGUI.pdf" className="btn btn-primary">
                Cliquez ici pour télécharger le CV
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
};

export default Resume;
