import React, { useState } from 'react';
import UpdateMobile from '../components/UpdateMobile';
import UpdatePassword from '../components/UpdatePassword';
import './css/UserProfilePage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserProfilePage = () => {
    const [showUpdateMobile, setShowUpdateMobile] = useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);

    const handleShowUpdateMobile = () => {
        setShowUpdateMobile(true);
        setShowUpdatePassword(false);
    };

    const handleShowUpdatePassword = () => {
        setShowUpdatePassword(true);
        setShowUpdateMobile(false);
    };

    return (
        <div>
            <Header />
            <div className="user-profile-container">
                <h2>User Profile</h2>
                <button className='btn-update' onClick={handleShowUpdateMobile}>Update your Mobile</button>
                <br></br>
                <button className='btn-update' onClick={handleShowUpdatePassword}>Update your Password</button>
                
                {showUpdateMobile && <UpdateMobile />}
                {showUpdatePassword && <UpdatePassword />}
            </div>
            <Footer />
        </div>
    );
};

export default UserProfilePage;
