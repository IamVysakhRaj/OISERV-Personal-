import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/productCard.css';

const ProductCard = ({ title, imageUrl, product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Navigating with product:', product);
        const categoryName = product.category ? product.category.categoryName : ''; 
     
        console.log('Category Name:', categoryName);
        navigate('/productproperties',{ state: { product, imageUrl }}); 
     };
     
    

    return (
        <div className="common-card" onClick={handleClick}>
            <img src={imageUrl} alt={title} className="common-card-image" />
            <div className="common-card-overlay">
                <div className="common-card-title">{title}</div>
            </div>
        </div>
    );
};

export default ProductCard;
