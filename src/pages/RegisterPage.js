import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import './css/RegisterPage.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const loginTime = new Date().getTime(); // For logout functionality after 28 days

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

    const handleMobileChange = (value) =>{
        setMobileNumber(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        // Check password strength
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            setIsLoading(false);
            return;
        }

        try{
            const response = await axios.post(`https://dev.vibegurukul.in/api/v1/register`, {
                email: email,
                password: password,
                full_name: fullName,
                mobile_number: mobileNumber
            });
            if(response.data.token_type = 'bearer'){
              console.log("Login Success")
              localStorage.setItem('access_token', response.data.access_token);
              localStorage.setItem('email', response.data.email);
              localStorage.setItem('full_name', response.data.full_name);
              localStorage.setItem('mobile_number', mobileNumber);
              localStorage.setItem('login_time', loginTime);
              navigate(`/home`);
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
                    <h4>Join Us Now</h4>
                    <p>Hey There,👋</p>
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
                        {/* <label htmlFor="mobile_number">Mobile</label> */}
                        <PhoneInput
                            country={'in'}
                            value={mobileNumber}
                            onChange={handleMobileChange}
                            inputClass="form-control"
                            inputProps={{
                                name: 'mobile',
                                required: true                                
                            }}               
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
                        <input type="checkbox" className="form-check" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Create an account'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;