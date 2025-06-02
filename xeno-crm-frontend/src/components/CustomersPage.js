import CustomerList from './CustomerList';

function CustomersPage({ orderAdded }) {
  return (
    <div>
      <CustomerList orderAdded={orderAdded} />
    </div>
  );
}

export default CustomersPage;
