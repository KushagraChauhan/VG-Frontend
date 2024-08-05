import React, { useEffect, useState} from 'react';
import axios from 'axios';
import LoadingSpinner from "../components/Loading";

const useFacebookSDK = () => {
    useEffect(() => {
        // Load the Facebook SDK script
        if (!document.getElementById('facebook-jssdk')) {
            const js = document.createElement('script');
            js.id = 'facebook-jssdk';
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            document.body.appendChild(js);
        }

        // Initialize the Facebook SDK after it has loaded
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: '467520316082991', 
                cookie: true,
                xfbml: true,
                version: 'v20.0'
            });
            window.FB.AppEvents.logPageView();
            console.log('Facebook SDK initialized');
        };

        if (window.FB) {
            window.fbAsyncInit();
        } else {
            console.log('Loading Facebook SDK...');
        }
    }, []);
};

const FacebookLoginButton = ({ onLogin }) => {
    const [isloading, setIsLoading] =  useState(false);
    useFacebookSDK();

    const handleLogin = () => {
        setIsLoading(true);
        window.FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome! Fetching your information....');

                const { accessToken } = response.authResponse;

                window.FB.api('/me', { fields: 'name,email' }, async function(fbResponse) {
                    console.log('Good to see you, ' + fbResponse.name + '.');

                    try {
                        const apiResponse = await axios.post('https://dev.vibegurukul.in/api/v1/auth/fb/', {
                            token: accessToken
                        });

                        if (apiResponse.status === 200) {
                            onLogin(apiResponse.data);
                            localStorage.setItem('access_token', apiResponse.data.token);
                            localStorage.setItem('email', apiResponse.data.email);
                            localStorage.setItem('full_name', apiResponse.data.full_name);
                        } else {
                            console.error('Error logging in with Facebook: ', apiResponse);
                        }
                    } catch (error) {
                        console.error('Error calling backend API: ', error);
                    } finally {
                        setIsLoading(false);
                    }
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
                setIsLoading(false);
            }
        }, { scope: 'public_profile,email' });
    };

    const buttonStyle = {
        backgroundColor: '#4267B2',
        alignSelf: 'center',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px'
    };

    const iconStyle = {
        marginRight: '10px',
    };

    if (isLoading) {
        return <LoadingSpinner />; 
    }
    
    return (
        <div id="fb-root">
            <a data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" style={{backgroundColor: "#3b5998"}} href="#!"
            role="button" onClick={handleLogin}>
                <i className="fab fa-facebook" style={iconStyle}></i>
                    Continue with Facebook
            </a>
        </div>
    );
};

export default FacebookLoginButton;
