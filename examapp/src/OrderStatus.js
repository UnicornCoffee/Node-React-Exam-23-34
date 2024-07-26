import React, { useState } from 'react';

const OrderStatus = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = (status) => {
        fetch(`http://127.0.0.1:8000/api/order/?status=${status}`)
            .then(response => response.json())
            .then(data => setOrders(data));
    };

    return (
        <div>
            <h1>Orders by Status</h1>
            <div>
                <button onClick={() => fetchOrders('O')}>Ordered</button>
                <button onClick={() => fetchOrders('P')}>Processing</button>
                <button onClick={() => fetchOrders('S')}>Shipped</button>
                <button onClick={() => fetchOrders('D')}>Delivered</button>
            </div>
            <div>
                {orders.map(order => (
                    <div key={order.id}>
                        <h2>Order ID: {order.id}</h2>
                        <p>Status: {order.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderStatus;
