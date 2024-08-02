import React, {useEffect} from "react";
import './css/Features.css';
import './css/ScrollAnimation.css';

const Features = () =>{
    useEffect(() => {
        const handleScroll = () => {
          const elements = document.querySelectorAll('.scroll-element');
          elements.forEach((element) => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
              element.classList.add('scroll-in-view');
            } else {
              element.classList.remove('scroll-in-view');
            }
          });
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return(
        <section className="features-section py-6 bg-light-primary">
            <div className="container">
                <h3 className="font-weight-bold mb-3" style={{ textAlign: 'center' }}>What We Offer?</h3>
                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center justify-content-center px-xl-6 aos-init aos-animate  scroll-element scroll-slide-up" data-aos="fade-up">         
                    <div className="col my-3">
                        <div className="card border-hover-primary hover-scale">
                            <div className="card-body">
                                <div className="text-primary mb-5">                           
                                        <img src='https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/traditions.svg' width='100' height='100' alt="traditions"></img>
                                </div>
                                <h6 className="font-weight-bold mb-3">Traditions</h6>
                                <p className="text-muted mb-0">Discover the Science, Logics and stories behind our traditions.</p>
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
                                <p className="text-muted mb-0">Explore the Dharma and principles that form core of Bharatiya Sanskriti.</p>
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
                                <p className="text-muted mb-0">Uncover the true history of Bharat with all the proofs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h3 className="font-weight-bold mb-3" style={{ textAlign: 'center' }}>Why Vibe Gurukul?</h3>
                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center justify-content-center px-xl-6 aos-init aos-animate  scroll-element scroll-slide-up" data-aos="fade-up">         
                    <div className="col my-3">
                        <div className="card border-hover-primary hover-scale">
                            <div className="card-body">
                                <div className="text-primary mb-5">                           
                                        <img src='https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/authentic-knowledge.png' width='100' height='100' alt="knowledge"></img>
                                </div>
                                <h6 className="font-weight-bold mb-3">Authentic Knowledge</h6>
                                <p className="text-muted mb-0">We provide accurate information with references to our Shastras <br></br>(Scriptures)</p>
                            </div>
                        </div>
                    </div>
                    <div className="col my-3">
                        <div className="card border-hover-primary hover-scale">
                            <div className="card-body">
                                <div className="text-primary mb-5">
                                    <img src='https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/historical-accuracy.png' width='100' height='100' alt="history"></img>
                                </div>
                                <h6 className="font-weight-bold mb-3">Historical Accuracy</h6>
                                <p className="text-muted mb-0">We share facts from Bhartiya Itihas, supported by credible sources from both Indian and foreign authors.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col my-3">
                        <div className="card border-hover-primary hover-scale">
                            <div className="card-body">
                                <div className="text-primary mb-5">
                                    <img className='bharat' src='https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/myth-busting.png' width='100' height='100' alt="myth"></img>
                                </div>
                                <h6 className="font-weight-bold mb-3">Myth-Busting</h6>
                                <p className="text-muted mb-0">We help you recognize and unlearn the false narratives that have been fed to us over the years.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h3 className="font-weight-bold mb-3" style={{ textAlign: 'center' }}>Your Learnings</h3>
                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center justify-content-center px-xl-6 aos-init aos-animate  scroll-element scroll-slide-up" data-aos="fade-up">         
                    <div className="col my-3">
                        <div className="card border-hover-primary hover-scale">
                            <div className="card-body">
                                <div className="text-primary mb-5">                           
                                        <img src='https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/hidden-truth.png' width='100' height='100' alt="hidden-truth"></img>
                                </div>
                                <h6 className="font-weight-bold mb-3">Unveil Hidden Truths</h6>
                                <p className="text-muted mb-0">Discover the real knowledge that has been deliberately obscured.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col my-3">
                        <div className="card border-hover-primary hover-scale">
                            <div className="card-body">
                                <div className="text-primary mb-5">
                                    <img src='https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/clear-misconceptions.png' width='100' height='100' alt="misconceptions"></img>
                                </div>
                                <h6 className="font-weight-bold mb-3">Clear Misconceptions</h6>
                                <p className="text-muted mb-0">Gain clarity about Sanatan Hindu Dharm and Bhartiya Itihas.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col my-3">
                        <div className="card border-hover-primary hover-scale">
                            <div className="card-body">
                                <div className="text-primary mb-5">
                                    <img className='bharat' src='https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/rich-habits.png' width='100' height='100' alt="habits"></img>
                                </div>
                                <h6 className="font-weight-bold mb-3">Develop Rich Habits</h6>
                                <p className="text-muted mb-0">Understand the science and logic behind our traditions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;