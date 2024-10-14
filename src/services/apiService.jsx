import axios from 'axios';

const API_URL = 'https://localhost:7242/api/Products';
const CAB_URL='https://localhost:7242/api/Cab';
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
        if (axios.isAxiosError(error)) {
            console.error('Error creating order:', error.response.data); // Log specific error data
        } else {
            console.error('Error creating order:', error);
        }
    }
    
};

export const submitAdditionalRequirement = async (message, username) => {
    const REQ_URL = "https://localhost:7242/api/Products/CreateAdditionalReq";
    try {
        const response = await axios.post(REQ_URL, { message, username });
        return response.data;
    } catch (error) {
        console.error("Error submitting additional requirement:", error.response?.data || error.message);
        throw error; // Throw error for handling in the calling component
    }
};

export const getRequestsByUsername = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/GetRequestsByUsername/${username}`);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching requests:', error);
        throw error; // Rethrow error for further handling
    }
};


export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/orders`);
        return response.data; // Return the order details
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error; // Rethrow the error for handling in the component
    }
};



export const markOrderAsDelivered = async (orderId) => {
    try {
        const response = await axios.put(`${API_URL}/markAsDelivered/${orderId}`);
        
        if (response.status !== 200  && response.status !== 204) {
            throw new Error(`Failed to mark order as delivered. Status code: ${response.status}`);
        }
        
        return response.data; // Optionally return the response data
    } catch (error) {
        console.error('Error marking order as delivered:', error.response ? error.response.data : error.message);
        throw new Error('Failed to mark order as delivered');
    }
};
export const deleteOrder = async (orderId) => {
    try {
        await axios.delete(`${API_URL}/DeleteOrder/${orderId}`);
    } catch (error) {
        console.error('Error deleting order:', error);
        throw new Error('Failed to delete the order.');
    }
};

export const createCabRequest = async (cabRequestData) => {
    const CAB_REQUEST_URL = `${CAB_URL}/CreateCab`; // Use the constant for easy access
    try {
        const response = await axios.post(CAB_REQUEST_URL, cabRequestData);
        return response.data; // Return the response data as needed
    } catch (error) {
        console.error('Error creating cab request:', error.response?.data || error.message);
        throw new Error('Failed to create cab request'); // Throw error for handling in the calling component
    }
};
export const getOrdersByUser = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/orders/${username}`);
        return response.data; // Return the user's order details
    } catch (error) {
        console.error('Error fetching orders by user:', error);
        throw error; // Rethrow the error for handling in the component
    }
};
export const getCabBookingsByUser = async (username) => {
    try {
        const response = await axios.get(`${CAB_URL}/GetCabByUsername/${username}`);
        console.log(response.data);
        return response.data || []; // Return an empty array if no data
    } catch (error) {
        console.error('Error fetching cab bookings:', error.response?.data || error.message);
        return []; // Return an empty array on error, so it doesn't break the component
    }
};


export const getAllCabRequests = async () => {
    try {
        const response = await axios.get(`${CAB_URL}/GetCab`);
        return response.data; // Return the data (array of cab requests)
    } catch (error) {
        console.error('Error fetching cab requests:', error.response?.data || error.message);
        throw new Error('Failed to fetch cab requests');
    }
};

export const updateCabApprovalStatus = async (cabId, isApproved) => {
    try {
        const response = await axios.put(`${CAB_URL}/ApproveCab/${cabId}`, { isApproved });
        return response.data; // Return the updated cab request
    } catch (error) {
        console.error('Error updating approval status:', error.response?.data || error.message);
        throw new Error('Failed to update cab approval status');
    }
};


export const deleteCab = async (cabId) => {
    try {
        const response = await axios.delete(`${CAB_URL}/DeleteCab/${cabId}`);
        return response.data; // Return the deleted cab details if needed
    } catch (error) {
        console.error('Error deleting cab:', error.response?.data || error.message);
        throw new Error('Failed to delete cab'); // Handle error appropriately
    }
};
export const getAdditionalRequirements = async () => {
    try {
        const response = await axios.get(`${API_URL}/GetAdditionalReqs`);
        console.log(response.data)
        return response.data;
        // Return the additional requirements data
    } catch (error) {
        console.error('Error fetching additional requirements:', error.response?.data || error.message);
        throw new Error('Failed to fetch additional requirements'); // Handle error appropriately
    }
};
