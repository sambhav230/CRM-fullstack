

import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AnalysisPage from './components/AnalysisPage';
import CampaignsPage from './components/CampaignsPage';
import CustomersPage from './components/CustomersPage';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import OrdersPage from './components/OrdersPage';

function App() {
  const [orderAdded, setOrderAdded] = useState(false);
  const [newCampaign, setNewCampaign] = useState(null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={
          <OrdersPage orderAdded={orderAdded} setOrderAdded={setOrderAdded} />
        } />
        <Route path="/customers" element={
          <CustomersPage orderAdded={orderAdded} />
        } />
        <Route path="/campaigns" element={
          <CampaignsPage newCampaign={newCampaign} setNewCampaign={setNewCampaign} />
        } />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
