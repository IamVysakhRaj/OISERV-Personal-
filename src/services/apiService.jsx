import axios from 'axios';

const API_URL = 'https://localhost:7242/api/Products';

// Fetch products by category
export const getProductsByCategory = async (categoryName) => {
    try {
        const response = await axios.get(`${API_URL}/filter`, {
            params: { categoryName },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products by category", error);
        throw error;
    }
};

// Fetch properties by product ID
export const getPropertiesByProductId = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/GetPropertiesByProductId/${productId}`);
        console.log('Fetched properties:', response.data); // Log the fetched properties
        return response.data;
    } catch (error) {
        console.error("Error fetching properties by product ID", error);
        throw error;
    }
};

// Create order details
export const createOrder = async (orderDetails) => {
    const ORDER_URL = 'https://localhost:7242/api/Products/CreateOrderDetails'; // Adjust this URL as needed
    try {
        const response = await axios.post(ORDER_URL, orderDetails);
        return response.data; // Handle response data as needed
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Rethrow the error for handling later
    }
};

export const submitAdditionalRequirement = async (message) => {
    const REQ_URL="https://localhost:7242/api/Products/CreateAdditionalReq";
    try {
        const response = await axios.post(REQ_URL, { message });
        return response.data;
    } catch (error) {
        console.error("Error submitting additional requirement", error);
        throw error; // Throw error for handling in the calling component
    }
};