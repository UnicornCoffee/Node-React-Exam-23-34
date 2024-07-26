import React, { useState, useEffect } from 'react';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/order/')
            .then(response => response.json())
            .then(data => setOrders(data));
    }, []);

    const fetchOrderDetails = (id) => {
        fetch(`http://127.0.0.1:8000/api/order/${id}`)
            .then(response => response.json())
            .then(data => setSelectedOrder(data));

        fetch(`http://127.0.0.1:8000/api/orderitem/?order=${id}`)
            .then(response => response.json())
            .then(items => {
                setOrderItems(items);
                let total = 0;
                items.forEach(item => {
                    fetch(item.product)
                        .then(response => response.json())
                        .then(product => {
                            total += product.price * item.quantity;
                            setProducts(products => [...products, product]);
                            setTotalPrice(total);
                        });
                });
            });
    };

    const handleOrderChange = (e) => {
        const id = e.target.value;
        fetchOrderDetails(id);
    };

    return (
        <div>
            <h1>Order Details</h1>
            <select onChange={handleOrderChange}>
                <option value="">Select an order</option>
                {orders.map(order => (
                    <option key={order.id} value={order.id}>
                        Order ID: {order.id}
                    </option>
                ))}
            </select>
            {selectedOrder && (
                <div>
                    <h2>Order ID: {selectedOrder.id}</h2>
                    <p>Date Ordered: {new Date(selectedOrder.date_ordered).toLocaleString()}</p>
                    <p>Shipping Address: {selectedOrder.shipping_addr}</p>
                    <p>Status: {selectedOrder.status}</p>
                    <h3>Order Items:</h3>
                    <div>
                        {orderItems.map(item => {
                            const product = products.find(p => p.id === item.product.split('/').pop());
                            return (
                                product && (
                                    <div key={item.id}>
                                        <p>Product: {product.name}</p>
                                        <p>Price: {product.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                )
                            );
                        })}
                    </div>
                    <h3>Total Price: {totalPrice}</h3>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
