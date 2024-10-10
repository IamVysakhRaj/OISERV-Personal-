import React, { useEffect, useState } from 'react';
import { getProductsByCategory } from '../services/apiService'; 
import ProductsList from './ProductsList';
import '../../src/styles/foodbev.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
//import { useLocation } from 'react-router-dom';
const FoodAndBeveragesPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { username } = useUser();
    //console.log(username);
    
    useEffect(() => {
        //console.log('Username:', username);
        const fetchProducts = async () => {
            try {
                const data = await getProductsByCategory('FoodAndBeverages');
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

    const handleOrderClick = (product) => {
        navigate('/orderpage', { state: { product } });
    };

    const handleBackClick = () => {
        navigate('/productproperties'); // Adjust this path as necessary
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="foodbev-container">
            <header className="header">
                <h1>Food & Beverages</h1>
            </header>
            <div className="card-container">
                <ProductsList products={products} onOrderClick={handleOrderClick} />
            </div>
        </div>
    );
};

export default FoodAndBeveragesPage;
