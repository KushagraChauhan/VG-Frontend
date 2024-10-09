import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Campaigns.css'; 

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [pledgeStatus, setPledgeStatus] = useState({});

  // Fetch campaigns from API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('https://dev.vibegurukul.in/api/v1/campaign');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();

    // Check pledge status in localStorage
    const savedPledges = JSON.parse(localStorage.getItem('pledgeStatus')) || {};
    setPledgeStatus(savedPledges);
  }, []);

  // Handle the pledge action
  const handlePledge = async (campaignId) => {
    if (!pledgeStatus[campaignId]) {
      try {
        await axios.post(`https://dev.vibegurukul.in/api/v1/campaign/${campaignId}/pledge`);
        const updatedPledgeStatus = { ...pledgeStatus, [campaignId]: true };
        setPledgeStatus(updatedPledgeStatus);
        localStorage.setItem('pledgeStatus', JSON.stringify(updatedPledgeStatus));
      } catch (error) {
        console.error('Error while pledging:', error);
      }
    } else {
      console.error('You have already pledged for this campaign.');
    }
  };

  const formattedText = (text) => {
    return (
      <div className="campaign-content">
        <p>
          {text.split(/(\.|\n)/).map((segment, idx) => (
            <span key={idx}>
              {segment}
              {segment === '.' || segment === '\n' ? <br /> : ''}
            </span>
          ))}
        </p>
      </div>
    );
  };
  
  
  
  
  

  return (
    <section className="light">
      <div className="container py-2">
        <div className="h1 text-center" id="pageHeaderTitle">Campaigns</div>
        {campaigns.map(campaign => (
          <div className="campaign" key={campaign._id}>
            <img className="campaign-img" src={campaign.image_url} alt={campaign.campaign_name} />
            <div className="campaign-text">
              <h1 className="campaign-title fw-bold">{campaign.campaign_name}</h1>
              <div className="campaign-bar"/>
              {formattedText(campaign.campaign_content)}
              <div className="campaign-bar"/>
              <h1 className="campaign-pledge fw-bold" >No. of Pledges taken: {campaign.pledge_counter}</h1>
                  <button
                    className="btn-pledge"
                    onClick={() => handlePledge(campaign._id)}
                    disabled={pledgeStatus[campaign._id]}
                  >
                    {pledgeStatus[campaign._id] ? 'Pledge Taken! Thanks' : 'I Pledge'}
                  </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Campaigns;
