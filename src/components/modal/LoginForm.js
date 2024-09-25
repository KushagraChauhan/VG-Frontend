import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
    
        try{
            const response = await axios.post(`https://dev.vibegurukul.in/api/v1/login`, {
                email: email,
                password: password
            });
            if(response.data.token_type = 'bearer'){
              console.log("Login Success")
              localStorage.setItem('access_token', response.data.access_token);
              localStorage.setItem('email', response.data.email);
              localStorage.setItem('full_name', response.data.full_name);
            }
            else{
              console.log("Email not found")
            //   navigate(`/register?email=${email}`);
            }
          } catch(errorMessage){
            setErrorMessage('Failed to Login. Please try again with correct password');
          } finally {
            setIsLoading(false);
          }
    
        setIsLoading(false);
      };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;
