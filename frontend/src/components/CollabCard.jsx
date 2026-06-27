import React from 'react';

const CollabCard = ({ collab, delay }) => {
  return (
    <div className="col-md-3 col-sm-6" data-aos="fade-up" data-aos-delay={delay}>
      <a href={collab.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
        <div className="collab-card d-flex flex-column justify-content-center align-items-center">
          <img src={collab.brand_logo} alt={collab.brand_name} className="img-fluid" />
          <h5 className="mt-3">{collab.brand_name}</h5>
        </div>
      </a>
    </div>
  );
};

export default CollabCard;
