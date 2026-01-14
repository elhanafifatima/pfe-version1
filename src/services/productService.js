import axios from 'axios';

// Mock API URL for Products Microservice
const API_URL = 'http://localhost:8082/api/products';

const productService = {
    /**
     * Fetch all products for the client store.
     */
    getProducts: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            // Mock data for demo/fallback
            return [
                {
                    id: 1,
                    name: 'Classic White Sneakers',
                    price: 89.99,
                    description: 'Timeless white sneakers for everyday comfort.',
                    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'
                },
                {
                    id: 2,
                    name: 'Professional Laptop',
                    price: 1249.00,
                    description: 'High-performance laptop for all your work needs.',
                    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
                },
                {
                    id: 3,
                    name: 'Noise-Cancelling Headphones',
                    price: 299.50,
                    description: 'Premium sound quality with active noise cancellation.',
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
                },
                {
                    id: 4,
                    name: 'Ergonomic Work Chair',
                    price: 349.99,
                    description: 'Adjustable chair designed for long hours of focus.',
                    image: 'https://images.unsplash.com/photo-1505843490701-515a00718600?w=500'
                },
                {
                    id: 5,
                    name: 'Smart Fitness Watch',
                    price: 199.00,
                    description: 'Track your health and activity in real-time.',
                    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
                },
                {
                    id: 6,
                    name: 'Minimalist Wall Clock',
                    price: 45.00,
                    description: 'Elegant design that complements any modern interior.',
                    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500'
                }
            ];
        }
    }
};

export default productService;
