import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import LPHeader from "../components/LPHeader";
import Campaigns from "../components/Campaigns";
import Footer from "../components/Footer";
import CourseRecommendation from "../components/CourseRecommendation";

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

  const course = {
    title: "Breaking myths: Status of women in Vedas and Manusmriti",
    description: "Let’s return to our roots, to a culture where Devi is worshipped and women are highly regarded. ",
    image_url: "https://vibegurukul.s3.ap-south-1.amazonaws.com/preview-image-04.webp",
    learnings: "Know the value of women & feminine. Expose people talking ill about Bhartiya Sanskriti. Be a true feminist and stand for Dharma."
  };

const CampaignPage = () => {
    const isAuthenticated = useAuth();
    return(  
    <div>
        {isAuthenticated ? <Header /> : <LPHeader />}
        <Campaigns />
        <CourseRecommendation course={course}/>
        {/* <Footer /> */}
    </div>
    );
}

export default CampaignPage;
