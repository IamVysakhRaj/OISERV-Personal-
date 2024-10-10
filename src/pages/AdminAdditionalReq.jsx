import React, { useEffect, useState } from 'react';
import { getAdditionalRequirements } from '../services/apiService';

const AdditionalRequirementsPage = () => {
    const [additionalReqs, setAdditionalReqs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the additional requirements using the service
                const data = await getAdditionalRequirements();
                setAdditionalReqs(data);
            } catch (err) {
                setError('Failed to fetch additional requirements. ' + err.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container-fluid">
            <h1>Additional Requirements</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {additionalReqs.length === 0 ? (
                <div className="alert alert-info">No additional requirements found.</div>
            ) : (
                <ul className="list-group">
                    {additionalReqs.map(req => (
                        <li key={req.id} className="list-group-item">
                            <strong>Message:</strong> {req.message} <br />
                            <strong>Username:</strong> {req.username || 'Anonymous'} <br />
                            <strong>Created At:</strong> {new Date(req.createdAt).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdditionalRequirementsPage;
