import { useEffect } from 'react';

const useCheckLoginExpiration = () => {
    // Function to log out the user and redirect to login page
    const logoutUser = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('email');
      localStorage.removeItem('full_name');
      localStorage.removeItem('login_time');
      window.location.href = '/welcome';
    };
  
    // Function to check if 28 days have passed since login
    const checkLoginExpiration = () => {
        const loginTime = localStorage.getItem('login_time');
        
        if (loginTime) {
            const loginTimestamp = parseInt(loginTime, 10); // Convert the string to a number
            const currentTime = new Date().getTime();
            const timeElapsed = currentTime - loginTimestamp;
            const maxTime = 1 * 24 * 60 * 60 * 1000; // 7 days in milliseconds - 1 for testing
            
            console.log('current:', currentTime);
            console.log('max:', maxTime);
            console.log('timeElapsed:', timeElapsed);
    
            // Log out user if 7 days have passed
            if (timeElapsed > maxTime) {
                logoutUser(); 
            }
        }
    };
  
    // Check login expiration on every app load
    useEffect(() => {
      checkLoginExpiration();
    }, []);
};

export default useCheckLoginExpiration;
