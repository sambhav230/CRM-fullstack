import axios from 'axios';
import { useEffect, useState } from 'react';

function CampaignList({ newCampaign }) {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (newCampaign) {
      setCampaigns(prev => [newCampaign, ...prev]);
    }
  }, [newCampaign]);

  const fetchCampaigns = () => {
    axios.get('http://localhost:8080/api/campaigns')
      .then(res => setCampaigns(res.data))
      .catch(() => setCampaigns([]));
  };

  const runCampaign = (id) => {
    axios.post(`http://localhost:8080/api/campaigns/${id}/run`)
      .then(res => {
        alert(res.data);
        fetchCampaigns();
      })
      .catch(() => alert("Error running campaign!"));
  };

  const fetchLogs = (id) => {
    setLoadingLogs(true);
    axios.get(`http://localhost:8080/api/campaigns/${id}/logs`)
      .then(res => {
        setSelectedLogs(res.data);
        setLoadingLogs(false);
      })
      .catch(() => {
        setSelectedLogs([]);
        setLoadingLogs(false);
      });
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>Campaign List</h2>
      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Channel</th>
            <th>Message</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.length === 0 ? (
            <tr>
              <td colSpan="6" align="center">No campaigns found.</td>
            </tr>
          ) : (
            campaigns.map(camp => (
              <tr key={camp.id}>
                <td>{camp.id}</td>
                <td>{camp.name}</td>
                <td>{camp.channel}</td>
                <td>{camp.message}</td>
                <td>{camp.createdAt ? new Date(camp.createdAt).toLocaleString() : ''}</td>
                <td>
                  <button onClick={() => runCampaign(camp.id)}>Run</button>
                  <button style={{ marginLeft: 8 }} onClick={() => fetchLogs(camp.id)}>Logs</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Logs Table */}
      {selectedLogs.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h3>Campaign Logs</h3>
          {loadingLogs ? (
            <div>Loading logs...</div>
          ) : (
            <table border="1" cellPadding="8" cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Sent At</th>
                </tr>
              </thead>
              <tbody>
                {selectedLogs.map(log => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.customer ? log.customer.name : ''}</td>
                    <td>{log.status}</td>
                    <td>{log.sentAt ? new Date(log.sentAt).toLocaleString() : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default CampaignList;
