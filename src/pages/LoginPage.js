import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();

    useEffect(() =>{
        const params = new URLSearchParams(location.search);
        const emailParam = params.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [location]);

    const handlePasswordChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
    
        // Will add the logic later 
    
        setIsLoading(false);
      };

    return(
        <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h1>Login now</h1>
            <p>Hi, Welcome back 👋</p>
          </div>
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
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
              <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <div className="login-image">
            <img src="https://via.placeholder.com/400x300" alt="Login Illustration" />
          </div>
        </div>
      </div>
    );
}

export default LoginPage;