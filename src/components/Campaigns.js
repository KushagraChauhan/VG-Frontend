import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import LoadingSpinner from "./Loading"; 
import './css/Campaigns.css';

// Define the Campaigns component
const Campaigns = () => {
  // State to store the list of campaigns fetched from the API
  const [campaigns, setCampaigns] = useState([]);
  // State to track the pledge status of each campaign (whether the user has pledged or not)
  const [pledgeStatus, setPledgeStatus] = useState({});
  // State to manage the loading state of the component
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to fetch campaigns from the API when the component mounts
  useEffect(() => {
    // Define an async function to fetch campaigns
    const fetchCampaigns = async () => {
      try {
        // Make a GET request to the API to fetch campaigns
        const response = await axios.get('https://dev.vibegurukul.in/api/v1/campaign');
        // Update the campaigns state with the fetched data
        setCampaigns(response.data);
        // Set isLoading to false since data has been fetched
        setIsLoading(false);
      } catch (error) {
        // Log any errors that occur during the API call
        console.error('Error fetching campaigns:', error);
      }
    };

    // Call the fetchCampaigns function
    fetchCampaigns();

    // Check if there are any saved pledge statuses in localStorage
    const savedPledges = JSON.parse(localStorage.getItem('pledgeStatus')) || {};
    // Update the pledgeStatus state with the saved pledge statuses
    setPledgeStatus(savedPledges);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to handle the pledge action for a campaign
  const handlePledge = async (campaignId) => {
    // Check if the user has already pledged for this campaign
    if (!pledgeStatus[campaignId]) {
      try {
        // Make a POST request to the API to pledge for the campaign
        await axios.post(`https://dev.vibegurukul.in/api/v1/campaign/${campaignId}/pledge`);
        // Update the pledgeStatus state to mark this campaign as pledged
        const updatedPledgeStatus = { ...pledgeStatus, [campaignId]: true };
        setPledgeStatus(updatedPledgeStatus);
        // Save the updated pledge status to localStorage
        localStorage.setItem('pledgeStatus', JSON.stringify(updatedPledgeStatus));
      } catch (error) {
        // Log any errors that occur during the pledge request
        console.error('Error while pledging:', error);
      }
    } else {
      // Log a message if the user has already pledged for this campaign
      console.error('You have already pledged for this campaign.');
    }
  };

  // Display the loading spinner if the data is still being fetched
  if (isLoading) return <LoadingSpinner />;

  // Helper function to format campaign content text
  const formattedText = (text) => {
    return (
      <div className="campaign-content">
        <p>
          {/* Split the text by periods or newlines and map over the segments */}
          {text.split(/(\.|\n)/).map((segment, idx) => (
            <span key={idx}>
              {/* Display the segment */}
              {segment}
              {/* Add a line break after periods or newlines */}
              {segment === '.' || segment === '\n' ? <br /> : ''}
            </span>
          ))}
        </p>
      </div>
    );
  };

  // Render the component
  return (
    <section className="light">
      <div className="container py-2">
        {/* Page header */}
        <div className="h1 text-center" id="pageHeaderTitle">Campaigns</div>
        {/* Map over the campaigns and display each one */}
        {campaigns.map(campaign => (
          <div className="campaign" key={campaign._id}>
            {/* Campaign image */}
            <img className="campaign-img" src={campaign.image_url} alt={campaign.campaign_name} />
            <div className="campaign-text">
              {/* Campaign title */}
              <h1 className="campaign-title fw-bold">{campaign.campaign_name}</h1>
              {/* Divider bar */}
              <div className="campaign-bar"/>
              {/* Display formatted campaign content */}
              {formattedText(campaign.campaign_content)}
              {/* Divider bar */}
              <div className="campaign-bar"/>
              {/* Display the number of pledges */}
              <h1 className="campaign-pledge fw-bold" >No. of Pledges taken: {campaign.pledge_counter}</h1>
              {/* Pledge button */}
              <button
                className="btn-pledge"
                onClick={() => handlePledge(campaign._id)} // Handle pledge on click
                disabled={pledgeStatus[campaign._id]} // Disable button if already pledged
              >
                {/* Display appropriate text based on pledge status */}
                {pledgeStatus[campaign._id] ? 'Pledge Taken! Thanks' : 'I Pledge'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Export the Campaigns component as the default export
export default Campaigns;