import React from 'react';
import './UserTestimonial.css';

const UserTestimonials = () => {
  return (
    <section className="clients-section">
      <h2>Each and every client is important</h2>
      <p>Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics</p>
      <div className="client-testimonials">
        <div className="client-testimonial">
          <img src="path_to_image" alt="Client" />
          <p>Slate helps you see how many more days you need to work to reach your financial goal for the month and year.</p>
          <p className="client-name">Regina Miles</p>
          <p className="client-title">Designer</p>
        </div>
        {/* Add more testimonials as needed */}
      </div>
    </section>
  );
};

export default UserTestimonials;
