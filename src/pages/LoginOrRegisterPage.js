import React, {useEffect, useState} from 'react';
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
      const response = await axios.get(`https://3.106.139.89/api/v1/check-email?email=${(email)}`)
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

  
  
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '106156762669-v00tgt7jmbpihh2c64id3fk0nqi41vjb.apps.googleusercontent.com',
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInBtn'),
      { theme: 'outline', size: 'large' }  // customization attributes
    );
  }, []);
  

  const handleCredentialResponse = async (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    //Send the ID token to the backend for verification
    const result = await axios.post('https://dev.vibegurukul.in/api/v1/auth/google', {
      token: response.credential
    }).then(result => {
      console.log('Login successful:', result);
      if (result.data.token) {
        localStorage.setItem('access_token', result.data.token);
        localStorage.setItem('email', response.data.user_email);
        navigate(`/home`);
      }
    }).catch(error => {
      console.error('Login failed:', error);
    });
  };
  return(
      <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Login or Create an account</h1>
        </div>
        <button className="btn btn-google" id="googleSignInBtn">
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