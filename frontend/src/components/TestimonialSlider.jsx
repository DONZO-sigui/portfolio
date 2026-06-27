import React from 'react';

const TestimonialSlider = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return <p className="text-center text-muted">Aucun témoignage à afficher.</p>;
  }

  return (
    <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-aos="fade-up">
      <div className="carousel-inner">
        {testimonials.map((test, index) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={test.id}>
            <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: '800px', backgroundColor: '#fff', borderRadius: '15px' }}>
              <div className="card-body p-5 text-center">
                <div className="text-warning mb-3 fs-4">
                  {'★'.repeat(test.rating)}{'☆'.repeat(5 - test.rating)}
                </div>
                <p className="lead fst-italic text-muted">"{test.content}"</p>
                <h5 className="mt-4 fw-bold">{test.author_name}</h5>
                <p className="text-muted small">{test.author_role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true" style={{ width: '40px', height: '40px' }}></span>
        <span className="visually-hidden">Précédent</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true" style={{ width: '40px', height: '40px' }}></span>
        <span className="visually-hidden">Suivant</span>
      </button>
    </div>
  );
};

export default TestimonialSlider;
