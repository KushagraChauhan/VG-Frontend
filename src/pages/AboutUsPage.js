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
        <h4>Explore the Depths of Sanatan Hindu Sanskriti with VIBE GURUKUL</h4>
        <br></br>
        Are you curious about the rich traditions and history of Sanatan Hindu culture? Do you want to understand the science and logic behind Hindu practices? VIBE GURUKUL is your gateway to authentic knowledge about Sanatan Hindu Sanskriti and Bhartiya Itihas.
        <br></br>
        <br></br>
        <h5>Our Mission</h5>
        At VIBE GURUKUL, we strive to uncover hidden truths and dispel false narratives that have clouded our understanding of our heritage. We believe that by learning about our history and traditions, you will develop a profound sense of pride in your Sanatani roots, leading to personal growth and enlightenment.
        <br></br>
        <h6>Why Learn About Sanatan Hindu Sanskriti?</h6>
        Understanding our Sanskriti and Itihas is not just about looking back; it's about enriching our present lives. By realizing the depth and richness of Bharat's culture, you'll experience an awakening that brings lasting pride and clarity.
        <br></br>
        <br></br>
        <h5>Our Philosophy</h5>
        Our goal is to make the knowledge of Sanatan Bharatiya Sanskriti accessible to everyone. We present information in a simple, interactive manner, making it easy to understand and appreciate.
        <br></br>
        <h6>What Makes VIBE GURUKUL Different?</h6>
        <ul>
        <li>Authentic Knowledge: We provide accurate information with references to our Shastras (Scriptures).</li>
        <li>Historical Accuracy: We share facts from Bhartiya Itihas, supported by credible sources from both Indian and foreign authors.</li>
        <li>Myth-Busting: We help you recognize and unlearn the false narratives that have been fed to us over the years.</li></ul>
        <h6>Your Learnings</h6>
        <ul>
        <li>Unveil Hidden Truths: Discover the real knowledge that has been deliberately obscured.</li>
        <li>Clear Misconceptions: Gain clarity about Sanatan Hindu Dharm and Bhartiya Itihas.</li>
        <li>Develop Rich Habits: Understand the science and logic behind our traditions, fostering habits that enhance your life.</li>
        <li>Ask Questions: Dive deep into Sanatan Hindu Sanskriti and feel free to question – because true understanding comes from inquiry.</li></ul>
        <br></br>
        <h6>Join us at VIBE GURUKUL and embark on a journey to rediscover and embrace the profound wisdom of our ancestors.</h6>

        <h3 className>Our Team</h3>
        </section>
        <Footer />
    </div>
    );
}

export default AboutUsPage;