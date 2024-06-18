import React from "react";
import './css/Features.css';

const Features = () =>{
    return(
        <section className="features-section">
        <div className="container">
            <div className="row">
            <div className="col-md-4">
                <div className="feature-box">
                <h3>Evaluation Time</h3>
                <p>The gradual accumulation of information about atomic and small-scale behaviour...</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="feature-box">
                <h3>Training Courses</h3>
                <p>The gradual accumulation of information about atomic and small-scale behaviour...</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="feature-box">
                <h3>Sales Planning</h3>
                <p>The gradual accumulation of information about atomic and small-scale behaviour...</p>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
};

export default Features;