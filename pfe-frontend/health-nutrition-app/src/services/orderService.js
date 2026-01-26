import axios from 'axios';

const ORDER_API = 'http://localhost:8083/api/orders';

const orderService = {
    getPurchaseHistory: async (clientId) => {
        try {
            const response = await axios.get(`${ORDER_API}/client/${clientId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching history:", error);
            return [];
        }
    },

    placeOrder: async (orderData) => {
        try {
            const response = await axios.post(ORDER_API, orderData);
            return response.data;
        } catch (error) {
            console.error("Error placing order:", error);
            throw error;
        }
    }
};

export default orderService;
