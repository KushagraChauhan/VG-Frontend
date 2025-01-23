import React, {useState} from 'react';
import axios from 'axios';
import LoadingSpinner from './Loading';
import './css/UserProfile.css';

const UpdatePassword = () =>{
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');

    const handleUpdatePassword = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!token){
            setError("Please log in first...");
            return;
        }

        try{
            const response = await axios.put(`https://dev.vibegurukul.in/api/v1/users/me/password`, {
                token: token,
                current_password: currentPassword,
                new_password: newPassword
        });
        if (response.status === 200) {
            setMessage('Password Updated Successfully!');
            setError('');
            setIsLoading(false);
        }
        }catch(error){
            setError('Error updating password. Please try again.');
            setMessage('');
            setIsLoading(false);
        }
    };
    return (
        <div className='update-container'>
            <div className="user-profile-container">           
                <h3>Update Password</h3>
                <p>Email: {email}</p>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                {isLoading ? <LoadingSpinner /> : (
                <form onSubmit={handleUpdatePassword}>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder='Current Password'
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder='New Password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>           
                    <button type="submit" className="btn btn-outline-primary">Update Password</button>
                </form>
                )}
            </div>
        </div>
    );
};

export default UpdatePassword;

