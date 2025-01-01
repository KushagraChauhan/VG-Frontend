import React, {useEffect, useState} from "react";
import './css/AboutUsPage.css';
import Header from '../components/Header';
import LPHeader from '../components/LPHeader';
import Footer from "../components/Footer";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
      const token = localStorage.getItem('access_token');
      const email = localStorage.getItem('email');
      if (token && email) {
        setIsAuthenticated(true);
      }
    }, []);
  
    return isAuthenticated;
  };

const AboutUsPage = () => {
    const isAuthenticated = useAuth();
    return(  
    <div>
        {isAuthenticated ? <Header /> : <LPHeader />}
        <section className="about-us" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <h1>About Us</h1>
        <h4>Explore the Depths of Sanatan Hindu Sanskriti with <b>VIBE GURUKUL</b></h4>
        <br></br>
        Are you curious about the rich traditions and history of Sanatan Hindu culture? Do you want to understand the science and logic behind Hindu practices? <b>VIBE GURUKUL</b> is your gateway to authentic knowledge about Sanatan Hindu Sanskriti and Bhartiya Itihas.
        <br></br>
        <br></br>
        <h5>Our Mission</h5>
        At <b>VIBE GURUKUL</b>, we strive to uncover hidden truths and dispel false narratives that have clouded our understanding of our heritage. We believe that by learning about our history and traditions, you will develop a profound sense of pride in your Sanatani roots, leading to personal growth and enlightenment.
        <br></br>
        <h5 className="secondary">Why Learn About Sanatan Hindu Sanskriti?</h5>
        Understanding our Sanskriti and Itihas is not just about looking back; it's about enriching our present lives. By realizing the depth and richness of Bharat's culture, you'll experience an awakening that brings lasting pride and clarity.
        <br></br>
        <br></br>
        <h5>Our Philosophy</h5>
        Our goal is to make the knowledge of Sanatan Bharatiya Sanskriti accessible to everyone. We present information in a simple, interactive manner, making it easy to understand and appreciate.
        <br></br>
        <h5 className="secondary">What Makes <b>VIBE GURUKUL</b> Different?</h5>
        <ul>
        <li><b>Authentic Knowledge</b>: We provide accurate information with references to our Shastras (Scriptures).</li>
        <li><b>Historical Accuracy</b>: We share facts from Bhartiya Itihas, supported by credible sources from both Indian and foreign authors.</li>
        <li><b>Myth-Busting</b>: We help you recognize and unlearn the false narratives that have been fed to us over the years.</li></ul>
        <h5 className="secondary">Your Learnings</h5>
        <ul>
        <li><b>Unveil Hidden Truths</b>: Discover the real knowledge that has been deliberately obscured.</li>
        <li><b>Clear Misconceptions</b>: Gain clarity about <b>Sanatan Hindu Dharm</b> and <b>Bhartiya Itihas</b>.</li>
        <li><b>Develop Rich Habits</b>: Understand the science and logic behind our traditions, fostering habits that enhance your life.</li>
        <li><b>Ask Questions</b>: Dive deep into Sanatan Hindu Sanskriti and feel free to question – because true understanding comes from inquiry.</li></ul>
        <br></br>
        <h5 className="secondary">Join us at <b>VIBE GURUKUL</b> and embark on a journey to rediscover and embrace the profound wisdom of our ancestors.</h5>
        </section>
        <section id="team" className="team section-bg">
          <h2 className="team-title">
            Our Team
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                  <div className="our-team">
                      <img src="https://vibegurukul.s3.ap-south-1.amazonaws.com/team-images/avantika-photo.jpg" alt="Avantika Singh"/>
                      <h3 className="title">Avantika Singh</h3>                        
                  </div>
              </div>
      
              <div className="col-md-3 col-sm-6">
                  <div className="our-team">
                  <img src="https://vibegurukul.s3.ap-south-1.amazonaws.com/team-images/kushagra-photo.jpg" alt="Kushagra Chauhan"/>
                  <h3 className="title">Kushagra Chauhan</h3>
                  </div>
              </div>

              <div className="col-md-3 col-sm-6">
                  <div className="our-team">
                  <img src="https://vibegurukul.s3.ap-south-1.amazonaws.com/team-images/naveen-photo.jpg" alt="Naveen Kumar"/>
                  <h3 className="title">Naveen Kumar</h3>
                  </div>
              </div>

              <div className="col-md-3 col-sm-6">
                  <div className="our-team">
                  <img src="https://vibegurukul.s3.ap-south-1.amazonaws.com/team-images/ayush-photo.jpg" alt="Ayush Agrawal"/>
                  <h3 className="title">Ayush Agrawal</h3>
                  </div>
              </div>

              <div className="col-md-3 col-sm-6">
                  <div className="our-team">
                  <img src="https://vibegurukul.s3.ap-south-1.amazonaws.com/team-images/shweta-photo.jpg" alt="Shweta Singh"/>
                  <h3 className="title">Shweta Singh Rajpoot</h3>
                  </div>
              </div>

              <div className="col-md-3 col-sm-6">
                  <div className="our-team">
                  <img src="https://vibegurukul.s3.ap-south-1.amazonaws.com/team-images/samarth-photo.jpg" alt="Samarth Seth"/>
                  <h3 className="title">Samarth Seth</h3>
                  </div>
              </div>
            </div>
          </div>
        </section>
        <section id="brand-value-pillars" className="brand-value-pillars">
        <h2 className="pillars-title">Brand Value Pillars (PRAI)</h2>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="pillar-card pride">
                  <h3 className="pillar-title">Pride</h3>
                  <p><strong>गौरव: भारतस्य - Respect in Bharat.</strong></p>
                  <p>Respect for Sanatan Sanskriti and acceptance for past and inclusivity of all the sects and communities.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="pillar-card responsibility">
                  <h3 className="pillar-title">Responsibility</h3>
                  <p>Respect for all sections of society without any bias or prejudice. Clearing myths and showing the actual values beheld.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="pillar-card authenticity">
                  <h3 className="pillar-title">Authenticity</h3>
                  <p>Proper proofs from our scriptures and facts from written sources for topics on Dharm, Sanskriti, and Bhartiya Itihas.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="pillar-card innovation">
                  <h3 className="pillar-title">Innovation</h3>
                  <p>Combining technology with the knowledge of our Sanskriti to make it more accessible and understandable.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
    </div>
    );
}

export default AboutUsPage;