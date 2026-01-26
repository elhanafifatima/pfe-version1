import axios from 'axios';

// Mock API URL for Products Microservice
const API_URL = 'http://localhost:8084/api/products';

const productService = {
    /**
     * Fetch all products from the microservice.
     * @returns {Promise<Array>}
     */
    getAllProducts: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            // Mock data in case the service is down
            return [
                {
                    id: 1,
                    name: 'Professional Laptop',
                    price: 1299.99,
                    category: 'Electronics',
                    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
                    description: 'High-performance laptop for professionals.'
                },
                {
                    id: 2,
                    name: 'Wireless Headphones',
                    price: 199.50,
                    category: 'Audio',
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
                    description: 'Noise-cancelling wireless headphones.'
                },
                {
                    id: 3,
                    name: 'Smart Watch',
                    price: 249.00,
                    category: 'Wearables',
                    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
                    description: 'Tracks your health and notifications.'
                },
                {
                    id: 4,
                    name: 'Ergonomic Desk Chair',
                    price: 349.99,
                    category: 'Furniture',
                    image: 'https://images.unsplash.com/photo-1505843490701-515a00718600?w=500',
                    description: 'Comfortable chair for long work hours.'
                }
            ];
        }
    },

    /**
     * Get product details by ID.
     * @param {number|string} id 
     * @returns {Promise<Object>}
     */
    getProductById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product ${id}:`, error);
            throw error;
        }
    }
};

export default productService;
