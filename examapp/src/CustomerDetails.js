import React, { useState, useEffect } from 'react';

const CustomerDetails = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerOrders, setCustomerOrders] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/customer/')
            .then(response => response.json())
            .then(data => setCustomers(data));
    }, []);

    const fetchCustomerDetails = (id) => {
        fetch(`http://127.0.0.1:8000/api/customer/${id}/`)
            .then(response => response.json())
            .then(data => setSelectedCustomer(data));

        fetch(`http://127.0.0.1:8000/api/order/?customer=${id}`)
            .then(response => response.json())
            .then(data => setCustomerOrders(data));
    };

    const handleCustomerChange = (e) => {
        const id = e.target.value;
        fetchCustomerDetails(id);
    };

    return (
        <div>
            <h1>Customer Details</h1>
            <select onChange={handleCustomerChange}>
                <option value="">Select a customer</option>
                {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                        {customer.name}
                    </option>
                ))}
            </select>
            {selectedCustomer && (
                <div>
                    <h2>{selectedCustomer.name}</h2>
                    <p>Email: {selectedCustomer.email}</p>
                    <p>Address: {selectedCustomer.address}</p>
                    <h3>Orders:</h3>
                    <div>
                        {customerOrders.map(order => (
                            <div key={order.id}>
                                <p>Order ID: {order.id}</p>
                                <p>Status: {order.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerDetails;
