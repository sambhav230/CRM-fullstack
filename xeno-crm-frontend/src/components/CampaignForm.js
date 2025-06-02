import axios from 'axios';
import { useState } from 'react';

function CampaignForm({ onCampaignCreated }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState('SMS');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/campaigns', {
        name,
        message,
        channel
      });
      setName('');
      setMessage('');
      setChannel('SMS');
      if (onCampaignCreated) onCampaignCreated(response.data);
    } catch (err) {
      setError('Failed to create campaign');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "40px auto", marginBottom: 30, border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
      <h2>Create Campaign</h2>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Campaign Name"
          value={name}
          required
          onChange={e => setName(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <textarea
          placeholder="Message"
          value={message}
          required
          onChange={e => setMessage(e.target.value)}
          style={{ width: "100%", padding: 8, minHeight: 60 }}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Channel: </label>
        <select value={channel} onChange={e => setChannel(e.target.value)}>
          <option value="SMS">SMS</option>
          <option value="Email">Email</option>
          <option value="WhatsApp">WhatsApp</option>
        </select>
      </div>
      <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
        {loading ? 'Creating...' : 'Create Campaign'}
      </button>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </form>
  );
}

export default CampaignForm;

