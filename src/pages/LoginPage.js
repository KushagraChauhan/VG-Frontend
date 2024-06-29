import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './css/LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() =>{
        const params = new URLSearchParams(location.search);
        const emailParam = params.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [location]);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
    
        try{
            const response = await axios.post(`http://3.106.139.89/api/v1/login`, {
                email: email,
                password: password
            });
            if(response.data.token_type = 'bearer'){
              console.log("Login Success")
              localStorage.setItem('access_token', response.data.access_token);
              localStorage.setItem('email', response.data.email)
              navigate(`/home`);
            }
            else{
              console.log("Email not found")
              navigate(`/register?email=${email}`);
            }
          } catch(errorMessage){
            setErrorMessage('Failed to Login. Please try again with correct password');
          } finally {
            setIsLoading(false);
          }
    
        setIsLoading(false);
      };

    return(
        <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h1>Login now</h1>
            <p>Hi, Welcome back 👋</p>
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
                readOnly
              />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    required
                    />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
              <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <div className="login-image">
            <img src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/form-image.png" alt="Login Illustration" />
          </div>
        </div>
      </div>
    );
}

export default LoginPage;