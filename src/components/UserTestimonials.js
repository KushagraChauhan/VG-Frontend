import React from 'react';
import './css/UserTestimonial.css';

const UserTestimonials = () => {
  return (
    
    <section className="bg-light py-5 py-xl-8">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <h2 className="fs-6 text-secondary mb-2 text-uppercase text-center">Happy Customers</h2>
            <p className="display-5 mb-4 mb-md-5 text-center">Lorem ipsum dolor sit amet</p>
            
          </div>
        </div>
      </div>
    
      <div className="container overflow-hidden">
        <div className="row gy-4 gy-md-0 gx-xxl-5">
          <div className="col-12 col-md-4">
            <div className="card border-0 border-bottom border-primary shadow-sm">
              <div className="card-body p-4 p-xxl-5">
                <figure>
                  <img className="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/SampleCourses.png" alt=""/>
                  <figcaption>
                    <div className="bsb-ratings text-warning mb-3" data-bsb-star="5" data-bsb-star-off="0"></div>
                    <blockquote className="bsb-blockquote-icon mb-4">Nam ultricies, ex lacinia dapibus faucibus, sapien ipsum euismod massa, at aliquet erat turpis quis diam. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</blockquote>
                    <h4 className="mb-2">Luna John</h4>
                    <h5 className="fs-6 text-secondary mb-0">UX Designer</h5>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card border-0 border-bottom border-primary shadow-sm">
              <div className="card-body p-4 p-xxl-5">
                <figure>
                  <img className="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/SampleCourses.png" alt=""/>
                  <figcaption>
                    <div className="bsb-ratings text-warning mb-3" data-bsb-star="4" data-bsb-star-off="1"></div>
                    <blockquote className="bsb-blockquote-icon mb-4">Nam ultricies, ex lacinia dapibus faucibus, sapien ipsum euismod massa, at aliquet erat turpis quis diam. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</blockquote>
                    <h4 className="mb-2">Mark Smith</h4>
                    <h5 className="fs-6 text-secondary mb-0">Marketing Specialist</h5>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card border-0 border-bottom border-primary shadow-sm">
              <div className="card-body p-4 p-xxl-5">
                <figure>
                  <img className="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/SampleCourses.png" alt=""/>
                  <figcaption>
                    <div className="bsb-ratings text-warning mb-3" data-bsb-star="5" data-bsb-star-off="0"></div>
                    <blockquote className="bsb-blockquote-icon mb-4">Nam ultricies, ex lacinia dapibus faucibus, sapien ipsum euismod massa, at aliquet erat turpis quis diam. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</blockquote>
                    <h4 className="mb-2">Luke Reeves</h4>
                    <h5 className="fs-6 text-secondary mb-0">Sales Manager</h5>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
