import CampaignForm from './CampaignForm';
import CampaignList from './CampaignList';

function CampaignsPage({ newCampaign, setNewCampaign }) {
  return (
    <div>
      <CampaignForm onCampaignCreated={setNewCampaign} />
      <CampaignList newCampaign={newCampaign} />
    </div>
  );
}

export default CampaignsPage;
