import React, { useEffect } from 'react';
import axios from 'axios';

const useFacebookSDK = () => {
    useEffect(() => {
        window.fbAsyncInit = function() {
            window.FB.init({
                appId      : '467520316082991', 
                cookie     : true,
                xfbml      : true,
                version    : 'v20.0'
            });
            window.FB.AppEvents.logPageView();   
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);
};

const FacebookLoginButton = ({ onLogin }) => {
    useFacebookSDK();

    const handleLogin = () => {
        window.FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome! Fetching your information....');

                const { accessToken } = response.authResponse;

                window.FB.api('/me', { fields: 'name,email' }, async function(fbResponse) {
                    console.log('Good to see you, ' + fbResponse.name + '.');

                    try {
                        const apiResponse = await axios.post('http://127.0.0.1:8000/api/v1/auth/fb/', {
                            token: accessToken
                        });

                        if (apiResponse.status === 200) {
                            onLogin(apiResponse.data);
                            localStorage.setItem('access_token', apiResponse.data.token);
                            localStorage.setItem('email', apiResponse.data.email);
                        } else {
                            console.error('Error logging in with Facebook: ', apiResponse);
                        }
                    } catch (error) {
                        console.error('Error calling backend API: ', error);
                    }
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, { scope: 'public_profile,email' });
    };

    return (
        <button onClick={handleLogin}>
            Login with Facebook
        </button>
    );
};

export default FacebookLoginButton;
