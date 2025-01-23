import React, { useState, useEffect } from 'react';
import UpdateMobile from '../components/UpdateMobile';
import UpdatePassword from '../components/UpdatePassword';
import UserCourses from '../components/UserCourses';
import './css/UserProfilePage.css';
import Header from '../components/Header';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [fullName, setFullName] = useState('');
  
    useEffect(() => {
      const token = localStorage.getItem('access_token');
      const email = localStorage.getItem('email');
      const storedFullName = localStorage.getItem('full_name');
      if (token && email) {
        setIsAuthenticated(true);
        setFullName(storedFullName || '');
      }
    }, []);
  
    return { isAuthenticated, fullName };
};

const UserProfilePage = () => {
    const [showUpdateMobile, setShowUpdateMobile] = useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [showUserCourses, setShowUserCourses] = useState(false);
    const { isAuthenticated, fullName } = useAuth();
    const [message, setMessage] = useState('');

    const handleShowUpdateMobile = () => {
        setShowUpdateMobile(true);
        setShowUpdatePassword(false);
    };

    const handleShowUpdatePassword = () => {
        setShowUpdatePassword(true);
        setShowUpdateMobile(false);
    };

    const handleMyCourses = () => {
        setShowUserCourses(true);
    }

    return (
        <div className="user-profile">
            <Header />
            {isAuthenticated ? (
                <div className="profile-banner">
                    <div className="profile-info">
                        <div>
                            <h2 className="profile-name">{fullName}</h2>
                            <p className="profile-username">@{fullName.toLowerCase().replace(/\s/g, '')}</p>
                        </div>
                    </div>
                    <button className="btn-go-to-course" onClick={handleMyCourses}>
                        My Courses
                    </button>
                </div>
            ) : (
                <div className="welcome-banner">
                    <h2>Welcome to Your Profile</h2>
                    <p>Please log in to update your details and view your courses.</p>
                </div>
            )}

            <div className="action-section">
                {isAuthenticated && (
                    <>
                        {message && <p className="success-message">{message}</p>}
                        {showUserCourses && <UserCourses />}
                        <div className="update-buttons">
                            <button className="btn-update" onClick={handleShowUpdateMobile}>
                                Update Mobile Number
                            </button>
                            <button className="btn-update" onClick={handleShowUpdatePassword}>
                                Update Password
                            </button>
                        </div>
                        {showUpdateMobile && <UpdateMobile />}
                        {showUpdatePassword && <UpdatePassword />}
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;
