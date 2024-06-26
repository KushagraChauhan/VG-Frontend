import React, {useState} from 'react';
import axios from 'axios';
import UpdateMobile from '../components/UpdateMobile';
import UpdatePassword from '../components/UpdatePassword';
import './css/UserProfilePage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserProfilePage = () =>{
   
    return (
        <div>
        <Header />
        <div className="user-profile-container">
            <h2>Update Profile</h2>
           
        <UpdateMobile />
        <UpdatePassword />
        
        </div>
        <Footer />
        </div>
    );
};

export default UserProfilePage;

