import axios from 'axios';
import { useEffect, useState } from 'react';

function OrderList(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [props.orderAdded]);

  const fetchOrders = () => {
    axios.get('http://localhost:8080/api/orders')
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setOrders([]);
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2>Order List</h2>
      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Item</th>
            <th>Price</th>
            <th>Order Date</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.item}</td>
                <td>{order.price}</td>
                <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : ''}</td>
                <td>{order.customerName}</td>
                <td>{order.customerEmail}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
