import React, { useState } from 'react';
import './LoginRegisterModal.css'; 
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import FacebookLoginButton from '../FBLoginButton';

const LoginRegisterModal = ({ showModal, setShowModal, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleModalClose = () => {
        setShowModal(false);
        if (onLoginSuccess) {
            onLoginSuccess();
        }
    };
    
    const switchToRegister = () => {
        setIsLogin(false);
    };

    const switchToLogin = () => {
        setIsLogin(true);
    };

    return (
        <>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-btn" onClick={handleModalClose}>×</span>
                        <div className="modal-header">
                            <h2>{isLogin ? 'Login' : 'Register'}</h2>
                        </div>
                        <FacebookLoginButton />
                        <div className="modal-body">
                            {isLogin ? <LoginForm/> : <RegisterForm />}
                        </div>
                        <div className="modal-footer">
                            {isLogin ? (
                                <p>
                                    Don't have an account?{' '}
                                    <span onClick={switchToRegister} className="switch-link">Register here</span>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{' '}
                                    <span onClick={switchToLogin} className="switch-link">Login here</span>
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
