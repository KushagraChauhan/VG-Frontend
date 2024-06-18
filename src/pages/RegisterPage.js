import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fullName, setFullName] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const emailParam = params.get('email');
        if(emailParam){
            setEmail(emailParam);
        }
    }, [location]);
    
    const handleFullNameChange = (event) =>{
        setFullName(event.target.value);
    };

    const handlePasswordChange = (event) =>{
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/register`, {
                email: email,
                password: password,
                full_name: fullName
            });
            if(response.data.token_type = 'bearer'){
              console.log("Login Success")
              localStorage.setItem('access_token', response.data.access_token);
              localStorage.setItem('email', response.data.email);
              navigate(`/home?email=${email}`);
            }
            else{
              console.log("Email found")
              navigate(`/login?email=${email}`);
            }
          } catch(errorMessage){
            setErrorMessage('Failed to Create Account. Please try again.');
          } finally {
            setIsLoading(false);
          }

        setIsLoading(false);
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-header">
                    <h1>Join Us Now</h1>
                    <p>hey There,👋</p>
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
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            className="form-control"
                            id="fullName"
                            value={fullName}
                            onChange={handleFullNameChange}
                            placeholder="Enter your Full Name"
                            required
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
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Create an account'}
                    </button>
                </form>
                <div className="register-image">
                    <img src="https://via.placeholder.com/400x300" alt="Register Illustration" />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;