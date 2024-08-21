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
        <div>
            <Header />
            <div className="user-profile-container">
                {isAuthenticated ? (
                    <>
                        <h3>User Profile</h3>
                        <h2>Hi, {fullName}</h2>
                        <p>Here, you can see the courses you are enrolled in.</p>
                        <button className='btn-go-to-course' onClick={handleMyCourses}>My Courses</button>
                        {showUserCourses && <UserCourses />}
                        {message && <p className="success-message">{message}</p>}
                        <div className="update-section">
                            <p>Here you can Update your mobile number or password</p>
                            <button className='btn-update' onClick={handleShowUpdateMobile}>Update Mobile Number</button>
                            <br></br>
                            <button className='btn-update' onClick={handleShowUpdatePassword}>Update Password</button>
                            {showUpdateMobile && <UpdateMobile />}
                            {showUpdatePassword && <UpdatePassword />}
                        </div>
                    </>
                ) : (
                    <div className="update-section">
                        <h2>Welcome to Your Profile</h2>
                        <p>Please log in to update your details and view your courses.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;
