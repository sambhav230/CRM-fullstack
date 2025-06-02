import axios from 'axios';
import { useState } from 'react';

function OrderForm({ onOrderAdded }) {
  const [form, setForm] = useState({
    item: '',
    price: '',
    customer: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('customer.')) {
      setForm({
        ...form,
        customer: { ...form.customer, [name.split('.')[1]]: value }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      'http://localhost:8080/api/orders',
      JSON.stringify(form), // Always stringify when setting content-type
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        if (onOrderAdded) onOrderAdded();
        setForm({
          item: '',
          price: '',
          customer: { name: '', email: '', phone: '', address: '', city: '', state: '' }
        });
      })
      .catch(error => {
        alert("Order add failed: " + (error.response?.data?.message || error.message));
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 600,
        margin: "40px auto",
        border: "1px solid #ccc",
        padding: 20,
        borderRadius: 8
      }}
    >
      <h2>Add Order</h2>
      <input
        name="item"
        placeholder="Item"
        value={form.item}
        onChange={handleChange}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        name="customer.name"
        placeholder="Customer Name"
        value={form.customer.name}
        onChange={handleChange}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        name="customer.email"
        placeholder="Customer Email"
        value={form.customer.email}
        onChange={handleChange}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        name="customer.phone"
        placeholder="Customer Phone"
        value={form.customer.phone}
        onChange={handleChange}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        name="customer.address"
        placeholder="Customer Address"
        value={form.customer.address}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        name="customer.city"
        placeholder="Customer City"
        value={form.customer.city}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        name="customer.state"
        placeholder="Customer State"
        value={form.customer.state}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <button type="submit" style={{ marginTop: 10 }}>Add Order</button>
    </form>
  );
}

export default OrderForm;
