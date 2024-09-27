import React from 'react';
import ProductCard from '../components/ProductCard'; // Update with the correct path

const ProductsList = ({ products }) => {
    if (!products || products.length === 0) {
        return <div>No products available.</div>;
    }

    return (
        <div className="card-container">
            {products.map(product => (
                <ProductCard 
                    key={product.productId}
                    title={product.productName}
                    imageUrl={product.imageUrl}
                    product={product} // Pass the entire product object
                />
            ))}
        </div>
    );
};

export default ProductsList;
