
import OrderForm from './OrderForm';
import OrderList from './OrderList';

function OrdersPage({ orderAdded, setOrderAdded }) {
  return (
    <div>
      <OrderForm onOrderAdded={() => setOrderAdded(prev => !prev)} />
      <OrderList orderAdded={orderAdded} />
    </div>
  );
}

export default OrdersPage;
