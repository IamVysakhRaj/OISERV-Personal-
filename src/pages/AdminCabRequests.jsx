import React, { useEffect, useState } from 'react';
import { getAllCabRequests,updateCabApprovalStatus } from '../services/apiService'; // Import service functions

const AdminCabRequests = () => {
    const [cabRequests, setCabRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch all cab requests on component mount
        const fetchRequests = async () => {
            try {
                const requests = await getAllCabRequests(); // Use the service function
                setCabRequests(requests);
            } catch (err) {
                setError('Error fetching cab requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleApproval = async (cabId, isApproved) => {
        try {
            await updateCabApprovalStatus(cabId, isApproved); // Use the service function
            setCabRequests(prevRequests =>
                prevRequests.map(req =>
                    req.cabId === cabId ? { ...req, isApproved: isApproved } : req
                )
            );
        } catch (error) {
            console.error('Error updating approval status:', error);
        }
    };

    if (loading) {
        return <p>Loading requests...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container-fluid mt-5 shadow-lg p-4">
    <h1 className="mb-4 text-center">User Cab Requests</h1>
    {cabRequests.length === 0 ? (
        <p className="text-center text-muted">No cab requests found.</p>
    ) : (
        <table className="table table-bordered table-hover table-striped">
            <thead className="table-dark">
                <tr>
                    <th>Pickup</th>
                    <th>Dropoff</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Passenger Count</th>
                    <th>Vehicle Preference</th>
                    <th>Username</th>
                    <th>Approved</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cabRequests.map((request) => (
                    <tr key={request.cabId}>
                        <td>{request.pickup}</td>
                        <td>{request.dropoff}</td>
                        <td>{request.date}</td>
                        <td>{request.time}</td>
                        <td>{request.passengerCount}</td>
                        <td>{request.vehiclePreference}</td>
                        <td>{request.username}</td>
                        <td>
                            {request.isApproved ? (
                                <span className="badge bg-success">Approved</span>
                            ) : (
                                <span className="badge bg-warning">Pending</span>
                            )}
                        </td>
                        <td>
                            {!request.isApproved && (
                                <>
                                    <button
                                        className="btn btn-outline-success me-2"
                                        onClick={() => handleApproval(request.cabId, true)}
                                    >
                                        Approve
                                    </button>
                                   
                                </>
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

export default AdminCabRequests;
