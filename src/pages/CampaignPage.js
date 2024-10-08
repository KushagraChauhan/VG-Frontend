import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import LPHeader from "../components/LPHeader";
import Campaigns from "../components/Campaigns";
import Footer from "../components/Footer";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
      const token = localStorage.getItem('access_token');
      const email = localStorage.getItem('email');
      if (token && email) {
        setIsAuthenticated(true);
      }
    }, []);
  
    return isAuthenticated;
  };

const CampaignPage = () => {
    const isAuthenticated = useAuth();
    return(  
    <div>
        {isAuthenticated ? <Header /> : <LPHeader />}
        <Campaigns />
        {/* <Footer /> */}
    </div>
    );
}

export default CampaignPage;
