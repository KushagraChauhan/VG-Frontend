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
            <div className="container">

              <div className="section-title">
                <h2 className="team-title">Team</h2>
              </div>

              <div className="row">

                <div className="col-lg-6">
                  <div className="member d-flex align-items-start">
                    <div className="pic"><img src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" className="img-fluid" alt=""/></div>
                    <div className="member-info">
                      <h4>Avantika Singh</h4>
                      {/* <span>Chief Executive Officer</span> */}
                      <p>Explicabo voluptatem mollitia et repellat qui dolorum quasi</p>
                      
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-4 mt-lg-0">
                  <div className="member d-flex align-items-start">
                    <div className="pic"><img src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" className="img-fluid" alt=""/></div>
                    <div className="member-info">
                      <h4>Kushagra Chauhan</h4>
                      {/* <span>Developer</span> */}
                      <p>Aut maiores voluptates amet et quis praesentium qui senda para</p>
                      
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-4">
                  <div className="member d-flex align-items-start">
                    <div className="pic"><img src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" className="img-fluid" alt=""/></div>
                    <div className="member-info">
                      <h4>Naveen Kumar</h4>
                      {/* <span>CTO</span> */}
                      <p>Quisquam facilis cum velit laborum corrupti fuga rerum quia</p>
                      
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-4" >
                  <div className="member d-flex align-items-start">
                    <div className="pic"><img src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" className="img-fluid" alt=""/></div>
                    <div className="member-info">
                      <h4>Ayush Agrawal</h4>
                      {/* <span>Accountant</span> */}
                      <p>Dolorum tempora officiis odit laborum officiis et et accusamus</p>
                      
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-4">
                  <div className="member d-flex align-items-start">
                    <div className="pic"><img src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" className="img-fluid" alt=""/></div>
                    <div className="member-info">
                      <h4>Shweta Singh Rajpoot</h4>
                      {/* <span>Accountant</span> */}
                      <p>Dolorum tempora officiis odit laborum officiis et et accusamus</p>
                      
                    </div>
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