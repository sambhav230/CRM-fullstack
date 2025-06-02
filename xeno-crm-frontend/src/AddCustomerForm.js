import axios from 'axios';
import { useState } from 'react';

function AddCustomerForm({ onCustomerAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/customers', {
        name,
        email,
        phone,
      });
      setName('');
      setEmail('');
      setPhone('');
      if (onCustomerAdded) {
        onCustomerAdded(response.data); // Parent ko naya customer bhejo
      }
    } catch (err) {
      setError('Failed to add customer');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 30, maxWidth: 600, margin: "40px auto" }}>
      <h2>Add Customer</h2>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={e => setName(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          required
          onChange={e => setPhone(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </div>
      <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
        {loading ? 'Adding...' : 'Add Customer'}
      </button>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </form>
  );
}

export default AddCustomerForm;
