import React, { useEffect, useState } from 'react';
import { getProductsByCategory } from '../services/apiService'; 
import ProductsList from './ProductsList';
// import CommonCard from '../components/commoncard';
const OfficeAndStationeryPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductsByCategory('Office And Stationary'); // Ensure this matches your API
                setProducts(data);
            } catch (err) {
                setError("Failed to fetch products");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="foodbev-container">
            <header className="header">
                <h1>OFFICE AND STATIONERY</h1>
            </header>
            <ProductsList products={products} />
        </div>
    );
};

export default OfficeAndStationeryPage;
