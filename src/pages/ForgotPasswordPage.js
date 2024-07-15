import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './css/LoginPage.css';
import LoadingSpinner from "../components/Loading";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
    
        try{
            const response = await axios.post(`https://dev.vibegurukul.in/api/v1/forgot-password`, {
                email: email
            });
            if(response.data.detail === "Success"){
              console.log("Password Reset Email Sent")
              navigate(`/reset-password?email=${email}`);
            }
            else{
              console.log("Email not found")
              navigate(`/register?email=${email}`);
            }
          } catch(errorMessage){
            setErrorMessage('Failed to Send Reset Email. Please try again later.');
          } finally {
            setIsLoading(false);
          }
    
        setIsLoading(false);
      };

    return(
      <div className="login-page">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="login-container">
          <div className="login-header">
            <h1>Forgot Your Password?</h1>
            <p>Worry not, just click the button below <br /> We will handle the rest</p>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Send Reset Email'}
            </button>
          </form>
          <div className="login-image">
            <img src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/form-image.png" alt="Login Illustration" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordPage;