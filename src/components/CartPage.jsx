// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../UserContext';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import '../styles/CartPage.css'; // Custom CSS for additional styles
// import { getOrdersByUser, deleteOrder } from '../services/apiService';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome
// import { faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Import icons

// const CartPage = () => {
//     const navigate = useNavigate();
//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null); // State for success message
//     const { username } = useUser();

//     useEffect(() => {
//         const loadOrders = async () => {
//             if (username) {
//                 try {
//                     const ordersData = await getOrdersByUser(username);
//                     const unfulfilledOrders = ordersData.filter(order => order.isDelivered === false);
//                     console.log("Unfulfilled orders data:", unfulfilledOrders); // Log the filtered unfulfilled orders
//                     setOrders(unfulfilledOrders);
//                 } catch (err) {
//                     setError('Failed to fetch orders. ' + err.message);
//                 }
//             }
//         };

//         loadOrders();
//     }, [username]);

//     const handleBackToHome = () => {
//         navigate(`/${username}`);
//     };

//     const handleDelete = async (orderId) => {
//         if (window.confirm("Are you sure you want to delete this order?")) {
//             try {
//                 await deleteOrder(orderId);
//                 setOrders(prevOrders => prevOrders.filter(order => order.orderDetailsId !== orderId));
//                 setSuccessMessage('Order deleted successfully!'); // Set success message
//                 setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
//             } catch (err) {
//                 setError('Failed to delete the order. ' + err.message);
//             }
//         }
//     };

//     return (
//         <div className="container-fluid mt-4">
//             <h1 className="text-center mb-4">My Orders</h1>
//             {error && <div className="alert alert-danger">{error}</div>}
//             {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Success message */}
//             {orders.length === 0 ? (
//                 <div className="alert alert-info text-center">No unfulfilled orders found.</div>
//             ) : (
//                 <div className="row">
//                     {orders.map(order => (
//                         <div key={order.orderDetailsId} className="col-md-4 mb-4">
//                             <div className="card shadow-sm hover-shadow rounded-lg">
//                                 <div className="card-body">
//                                     <h5 className="card-title font-weight-bold">{order.productName}</h5>
//                                     <p className="card-text text-muted"><strong>Quantity:</strong> {order.quantity}</p>
//                                     <p className="card-text text-muted"><strong>Custom Preferences:</strong> {order.customPreferences}</p>
//                                     <p className="card-text text-muted"><strong>Properties:</strong> {order.properties}</p>
//                                     <button 
//                                         className="btn btn-outline-danger w-100 mt-2" 
//                                         onClick={() => handleDelete(order.orderDetailsId)}
//                                     >
//                                         <FontAwesomeIcon icon={faTrash} /> Delete Order
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             <div className="text-center mt-4">
//                 <button onClick={handleBackToHome} className="btn btn-primary btn-lg shadow-lg">
//                     <FontAwesomeIcon icon={faShoppingCart} /> Back to Home
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CartPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/CartPage.css'; 
import { getOrdersByUser, deleteOrder, getCabBookingsByUser, getRequestsByUsername, deleteCab } from '../services/apiService'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrash, faShoppingCart, faCar } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [cabBookings, setCabBookings] = useState([]);
    const [additionalRequests, setAdditionalRequests] = useState([]); // State for additional requests
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); 
    const { username } = useUser();

    useEffect(() => {
        const loadData = async () => {
            if (username) {
                try {
                    const ordersData = await getOrdersByUser(username);
                    const cabBookingsData = await getCabBookingsByUser(username);
                    const requestsData = await getRequestsByUsername(username);
                    const unfulfilledOrders = ordersData.filter(order => !order.isDelivered);
                    
                    setOrders(unfulfilledOrders);
                    setCabBookings(cabBookingsData); 
                    setAdditionalRequests(requestsData);
                } catch (err) {
                    setError('Failed to fetch data. ' + err.message);
                }
            }
        };

        loadData();
    }, [username]);

    const handleBackToHome = () => {
        navigate(`/${username}`);
    };

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await deleteOrder(orderId);
                setOrders(prevOrders => prevOrders.filter(order => order.orderDetailsId !== orderId));
                setSuccessMessage('Order deleted successfully!');
                setTimeout(() => setSuccessMessage(null), 3000);
            } catch (err) {
                setError('Failed to delete the order. ' + err.message);
            }
        }
    };

    const handleDeleteCab = async (cabId) => {
        if (window.confirm("Are you sure you want to delete this cab booking?")) {
            try {
                await deleteCab(cabId);
                setCabBookings(prevCabBookings => prevCabBookings.filter(cab => cab.cabBookingId !== cabId));
                setSuccessMessage('Cab booking deleted successfully!');
                setTimeout(() => setSuccessMessage(null), 3000);
            } catch (err) {
                setError('Failed to delete the cab booking. ' + err.message);
            }
        }
    };

    return (
        <div className="container-fluid mt-4">
            <h1 className="text-center mb-4">My Orders</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {/* Orders Section */}
            {orders.length === 0 ? (
                <div className="alert alert-info text-center">No unfulfilled orders found.</div>
            ) : (
                <div className="row">
                    {orders.map(order => (
                        <div key={order.orderDetailsId} className="col-md-4 mb-4">
                            <div className="card shadow-sm hover-shadow rounded-lg">
                                <div className="card-body">
                                    <h5 className="card-title font-weight-bold">{order.productName}</h5>
                                    <p className="card-text text-muted"><strong>Quantity:</strong> {order.quantity}</p>
                                    <p className="card-text text-muted"><strong>Custom Preferences:</strong> {order.customPreferences}</p>
                                    <p className="card-text text-muted"><strong>Properties:</strong> {order.properties}</p>
                                    <button 
                                        className="btn btn-outline-danger w-100 mt-2" 
                                        onClick={() => handleDeleteOrder(order.orderDetailsId)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> Delete Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Cab Bookings Section */}
            <h2 className="text-center mt-5 mb-4">My Cab Bookings</h2>
            {cabBookings.length === 0 ? (
                <div className="alert alert-info text-center">No cab bookings found.</div>
            ) : (
                <div className="row">
                    {cabBookings.map(booking => (
                        <div key={booking.cabId} className="col-md-4 mb-4">
                            <div className="card shadow-sm hover-shadow rounded-lg">
                                <div className="card-body">
                                    <h5 className="card-title font-weight-bold">
                                        <FontAwesomeIcon icon={faCar} /> {booking.pickup} TO {booking.dropoff}
                                    </h5>
                                    <p className="card-text text-muted"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                                    <p className="card-text text-muted"><strong>Time:</strong> {booking.time}</p>
                                    <p className="card-text text-muted"><strong>Cab Type:</strong> {booking.vehiclePreference}</p>
                                    {/* <p className="card-text text-muted"><strong>Cab ID:</strong> {booking.cabId}</p> */}
                                    <p className="card-text text-muted">
                                        <strong>Status:</strong> {booking.isApproved ? 'Approved' : 'Pending'}
                                    </p>
                                    { !booking.isApproved && ( // Only show delete button if status is pending
                                        <button 
                                            className="btn btn-outline-danger w-100 mt-2" 
                                            onClick={() => handleDeleteCab(booking.cabId)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Delete Cab Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Additional Requests Section */}
            <h2 className="text-center mt-5 mb-4">Additional Requests</h2>
            {additionalRequests.length === 0 ? (
                <div className="alert alert-info text-center">No additional requests found.</div>
            ) : (
                <div className="row">
                    {additionalRequests.map(request => (
                        <div key={request.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm hover-shadow rounded-lg">
                                <div className="card-body">
                                    <h5 className="card-title font-weight-bold">Request</h5>
                                    <p className="card-text"><strong>Message:</strong> {request.message}</p>
                                    <p className="card-text text-muted"><strong>Submitted by:</strong> {request.username}</p>
                                    <p className="card-text text-muted"><strong>Date:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="text-center mt-4">
                <button onClick={handleBackToHome} className="btn btn-primary btn-lg shadow-lg">
                    <FontAwesomeIcon icon={faShoppingCart} /> Back to Home
                </button>
            </div>
        </div>
    );
};

export default CartPage;
