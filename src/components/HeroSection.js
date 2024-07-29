import React from "react";
import './css/HeroSection.css';

const HeroSection = () => {
    return(
        <section className="hero-section">
            <div className="container">
                <h1>Come Learn With Us</h1>
                <p>Delve into the unkowns of Sanatan With Us</p>
                <div className="hero-buttons">
                    <a className="btn btn-outline-primary" href="/courses">Learn More</a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;