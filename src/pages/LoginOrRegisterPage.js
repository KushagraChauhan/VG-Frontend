import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './css/LoginOrRegisterPage.css';

const LoginOrRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try{
      const response = await axios.get(`https://dev.vibegurukul.in/api/v1/check-email?email=${(email)}`)
      //console.log(response.data);
      //console.log(response.status);
      if(response.data.email_registered){
        console.log("Email Found")
        navigate(`/login?email=${email}`);
      }
      else{
        console.log("Email not found")
        navigate(`/register?email=${email}`);
      }
    } catch(errorMessage){
      setErrorMessage('Failed to check email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return(
      <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Login or Create an account</h1>
        </div>
        <button className="btn btn-google">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" />
          Login with Google
        </button>
        <div className="separator">
          <span>or Login with Email</span>
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
              onChange={handleEmailChange}
              placeholder="Enter your email id"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Continue with Email'}
          </button>
        </form>
        <div className="login-image">
          <img src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/form-image.png" alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default LoginOrRegisterPage;