import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './css/LoginPage.css';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
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

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
    
        try{
            const response = await axios.post(`https://dev.vibegurukul.in/api/v1/reset-password`, {
                token: resetToken,
                new_password: newPassword
            });
            if(response.data.message === "Password reset successful"){
              console.log("Password reset success...")
              navigate(`/login?email=${email}`);
            }
            else{
              console.log("Email not found")
              navigate(`/register?email=${email}`);
            }
          } catch(errorMessage){
            setErrorMessage('Failed to Send Reset Email. Please try again later.');
          } finally {
            setIsLoading(false);
          }
    
        setIsLoading(false);
      };

    return(
        <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h1>Reset Your Password Here</h1>
            {/* <p>Worry not, just click the button below <br></br> We will handle the rest</p> */}
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
              <div className="form-group">
                <label htmlFor="">Token</label>
                <input
                    type="reset-token"
                    className="form-control"
                    id="reset-token"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Enter the token received on the email"
                    required
                    />
            </div>
            <div className="form-group">
                <label htmlFor="new-password">Password</label>
                <input
                    type="new-password"
                    className="form-control"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    required
                    />
            </div>
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Reset Password'}
            </button>
          </form>
          <div className="login-image">
            <img src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/form-image.png" alt="Login Illustration" />
          </div>
        </div>
      </div>
    );
}

export default ResetPasswordPage;