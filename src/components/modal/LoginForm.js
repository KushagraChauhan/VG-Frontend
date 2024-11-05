import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const loginTime = new Date().getTime();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post(`https://dev.vibegurukul.in/api/v1/login`, {
                email: email,
                password: password
            });
            if (response.data.access_token) {
                console.log("Login Success");
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('full_name', response.data.full_name);
                localStorage.setItem('login_time', loginTime);
                onSuccess();
            } else {
                setErrorMessage('Invalid email or password');
            }
        } catch (error) {
            setErrorMessage('Failed to Login. Please try again with correct credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                {isLoading ? 'Loading...' : 'Login'}
            </button>

            {errorMessage && <p style={{ color: 'red', marginTop: '14px' }}>{errorMessage}</p>}
        </form>
    );
};

export default LoginForm;
