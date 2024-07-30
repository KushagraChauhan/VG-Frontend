import React, {useState} from 'react';
import axios from 'axios';
import LoadingSpinner from './Loading';
import './css/UserProfile.css';

const UpdateMobile = () =>{
    const [mobileNumber, setMobileNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');
    const mobile_number = localStorage.getItem('mobile_number')

    const handleUpdateMobile = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!token){
            setError("Please log in first...");
            return;
        }

        try{
            const response = await axios.put(`https://dev.vibegurukul.in/api/v1/users/me/mobile`, {
                token: token,
                new_mobile: mobileNumber,
        });
        if (response.status === 200) {
            setMessage('Mobile Number updated successfully!');
            setIsLoading(false);
            localStorage.setItem('mobile_number', mobileNumber);
            setError('');
        }
        }catch(error){
            setError('Error updating Mobile Number. Please try again.');
            setIsLoading(false);
            setMessage('');
        }
    };

    

    return (
        <div className="user-profile-container">
            <h3>Update Mobile Number</h3>
            <p>Email: {email}</p>
            {
                mobile_number ? (
                <p>Current Mobile: {mobile_number}</p>
                ) : (
                    <p> Mobile number not present</p>
                )
            }
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            {isLoading ? <LoadingSpinner /> : (
            <form onSubmit={handleUpdateMobile}>
                <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary">Update Mobile</button>
            </form>
            )}
        </div>
    );
};

export default UpdateMobile;

