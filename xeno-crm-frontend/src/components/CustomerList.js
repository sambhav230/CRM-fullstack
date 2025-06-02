import axios from 'axios';
import { useEffect, useState } from 'react';

function CustomerList(props) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line
  }, [props.orderAdded]);

  const fetchCustomers = () => {
    axios.get('http://localhost:8080/api/customers')
      .then(response => {
        // Defensive: Always set an array
        const data = response.data;
        if (Array.isArray(data)) {
          setCustomers(data);
        } else if (data && Array.isArray(data.customers)) {
          setCustomers(data.customers);
        } else {
          setCustomers([]);
        }
        setLoading(false);
      })
      .catch(error => {
        setCustomers([]);
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2>Customer List</h2>
      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Total Orders</th>
            <th>Total Spend</th>
            <th>Recent Order Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(customers) && customers.length > 0 ? (
            customers.map(cust => (
              <tr key={cust.customerId}>
                <td>{cust.customerId}</td>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>
                <td>{cust.address}</td>
                <td>{cust.city}</td>
                <td>{cust.state}</td>
                <td>{cust.totalOrders}</td>
                <td>{cust.totalSpend}</td>
                <td>{cust.recentOrderDate ? new Date(cust.recentOrderDate).toLocaleString() : ''}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" align="center">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
