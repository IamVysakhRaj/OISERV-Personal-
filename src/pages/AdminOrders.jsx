import React, { useEffect, useState } from 'react';
import { getAllOrders, markOrderAsDelivered } from '../services/apiService';
import '../styles/AdminOrders.css'; // Import custom styles

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getAllOrders(); // service function
                setOrders(ordersData);
            } catch (err) {
                setError('Failed to fetch orders');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleMarkAsDelivered = async (orderId) => {
        try {
            await markOrderAsDelivered(orderId);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderDetailsId === orderId
                        ? { ...order, isDelivered: true }
                        : order
                )
            );
        } catch (err) {
            console.error('Failed to mark order as delivered:', err);
            setError('Failed to mark order as delivered');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container-fluid mt-4 admin-orders-container shadow-lg p-4">
            <h1 className="mb-4 text-center">All Order Details</h1>
            {orders.length === 0 ? (
                <p className="text-center text-muted">No orders found.</p>
            ) : (
                <table className="table table-bordered table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Properties</th>
                            <th>Custom Preferences</th>
                            <th>Username</th>
                            {/* <th>Order Date</th> */}
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderDetailsId}>
                                <td>{order.productName}</td>
                                <td>{order.quantity}</td>
                                <td>{order.properties}</td>
                                <td>{order.customPreferences}</td>
                                <td>{order.user}</td>
                                {/* <td>{new Date(order.createdAt).toLocaleDateString()}</td> */}
                                <td>
                                    {order.isDelivered ? (
                                        <span className="badge bg-success">Delivered</span>
                                    ) : (
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={() => handleMarkAsDelivered(order.orderDetailsId)}
                                        >
                                            Mark as Delivered
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminOrders;
