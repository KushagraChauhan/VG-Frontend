import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';

const RegisterForm = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const loginTime = new Date().getTime();

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
            if(response.data.token_type === 'bearer'){
              localStorage.setItem('access_token', response.data.access_token);
              localStorage.setItem('email', response.data.email);
              localStorage.setItem('full_name', response.data.full_name);
              localStorage.setItem('mobile_number', mobileNumber);
              localStorage.setItem('login_time', loginTime);
              onSuccess();
            }
            else{
                setErrorMessage('Failed to Create Account. Please try again.');
            }
          } catch(errorMessage){
            setErrorMessage('Failed to Create Account. Please try again.');
          } finally {
            setIsLoading(false);
          }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
            <div className='form-group'>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Create an account'}
            </button>

            {errorMessage && <p style={{ color: 'red', marginTop: '14px' }}>{errorMessage}</p>}
        </form>
    );
};

export default RegisterForm;
