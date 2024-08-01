import React from "react";
import './css/Features.css';

const Features = () =>{
    return(
        <section className="features-section py-6 bg-light-primary">
    <div className="container">
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center justify-content-center px-xl-6 aos-init aos-animate" data-aos="fade-up">
            <div className="col my-3">
                <div className="card border-hover-primary hover-scale">
                    <div className="card-body">
                        <div className="text-primary mb-5">                           
                                <img src='https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/traditions.svg' width='100' height='100' alt="traditions"></img>
                        </div>
                        <h6 className="font-weight-bold mb-3">Traditions</h6>
                        <p className="text-muted mb-0">Learn the Science, Logics and stories of our traditions.</p>
                    </div>
                </div>
            </div>
            <div className="col my-3">
                <div className="card border-hover-primary hover-scale">
                    <div className="card-body">
                        <div className="text-primary mb-5">
                            <img src='https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/hindu.svg' width='100' height='100' alt="hindu"></img>
                        </div>
                        <h6 className="font-weight-bold mb-3">Sanatan Hindu Sanskriti</h6>
                        <p className="text-muted mb-0">Learn about the principles of Sanatan Hindu Sanskriti.</p>
                    </div>
                </div>
            </div>
            <div className="col my-3">
                <div className="card border-hover-primary hover-scale">
                    <div className="card-body">
                        <div className="text-primary mb-5">
                            <img className='bharat' src='https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/itihas-of-bharat.svg' width='100' height='100' alt="bharat"></img>
                        </div>
                        <h6 className="font-weight-bold mb-3">Itihas of Bharat</h6>
                        <p className="text-muted mb-0">Learn the true Itihas of Bharat. Know all the references from History by historians.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    );
};

export default Features;