import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './css/LoginOrRegisterPage.css';
import FacebookLoginButton from '../components/FBLoginButton';

const LoginOrRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const isValidEmail = (email) => {
    // Basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);
    

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

  
  
  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: '106156762669-v00tgt7jmbpihh2c64id3fk0nqi41vjb.apps.googleusercontent.com',
  //     callback: handleCredentialResponse
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById('googleSignInBtn'),
  //     { theme: 'outline', size: 'large' }  // customization attributes
  //   );
  // }, []);
  

  // const handleCredentialResponse = async (response) => {
  //   //Send the ID token to the backend for verification
  //   const result = await axios.post('https://dev.vibegurukul.in/api/v1/auth/google', {
  //     token: response.credential
  //   }).then(result => {
  //     if (result.data.token) {
  //       localStorage.setItem('access_token', result.data.token);
  //       localStorage.setItem('email', result.data.email);
  //       navigate(`/home`);
  //     }
  //   }).catch(error => {
  //     console.error('Login failed:', error);
  //   });
  // };

  const handleFacebookLogin = (userInfo) => {
    navigate(`/home`);
  };

  return(
      <div className="welcome-page">
        <div className="welcome-container">
          <div className="welcome-header">
            <h4>Welcome to VIBE GURUKUL</h4>
          </div>
          <FacebookLoginButton onLogin={handleFacebookLogin} />
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
 
        </div>
       
    </div>
  );
};

export default LoginOrRegisterPage;