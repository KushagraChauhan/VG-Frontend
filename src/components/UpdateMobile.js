import React, {useState} from 'react';
import axios from 'axios';
import './css/UserProfile.css';

const UpdateMobile = () =>{
    const [mobileNumber, setMobileNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');

    const handleUpdateMobile = async(e) => {
        e.preventDefault();
        if (!token){
            setError("Please log in first...");
            return;
        }

        try{
            const response = await axios.put(`https://3.106.139.89/api/v1/users/me/mobile`, {
                token: token,
                new_mobile: mobileNumber,
        });
        if (response.status === 200) {
            setMessage('Mobile Number updated successfully!');
            setError('');
        }
        }catch(error){
            setError('Error updating Mobile Number. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="user-profile-container">
            <h3>Update Mobile Number</h3>
            <p>Email: {email}</p>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
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
                <button type="submit" className="btn btn-primary">Update Mobile</button>
            </form>
        </div>
    );
};

export default UpdateMobile;

