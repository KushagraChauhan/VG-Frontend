import React, { useState } from 'react';
import './LoginRegisterModal.css'; 
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import FacebookLoginButton from '../FBLoginButton';

const LoginRegisterModal = ({ showModal, setShowModal, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleModalClose = () => {
        setShowModal(false);
    };

    const switchToRegister = () => {
        setIsLogin(true);
    };

    const switchToLogin = () => {
        setIsLogin(false);
    };

    // const handleFacebookLogin = () => {
    //     showModal(false);
    //     onLoginSuccess();
    //     window.location.reload();
    //   };

    return (
        <>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-btn" onClick={handleModalClose}>×</span>
                        <div className="modal-header">
                            <h2>{isLogin ? 'Register' : 'Login'}</h2>
                        </div>
                        {/* <FacebookLoginButton onLogin={handleFacebookLogin} /> */}
                        <br />
                        <div className="modal-body">
                            {isLogin ? (
                                <RegisterForm onSuccess={onLoginSuccess} /> 
                            ) : (
                                <LoginForm onSuccess={onLoginSuccess} /> 
                            )}
                        </div>
                        <div className="modal-footer">
                            {isLogin ? (
                                <p>
                                Already have an account?{' '}
                                <span onClick={switchToLogin} className="switch-link">Login here</span>
                            </p>
                            ) : (                               
                                <p>
                                Don't have an account?{' '}
                                <span onClick={switchToRegister} className="switch-link">Register here</span>
                            </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginRegisterModal;
