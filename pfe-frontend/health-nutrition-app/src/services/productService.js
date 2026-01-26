import axios from 'axios';

const PRODUCT_API = 'http://localhost:8084/api/products';

const productService = {
    getProducts: async () => {
        try {
            const response = await axios.get(PRODUCT_API);
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            // Fallback for demo
            return [
                { id: 101, name: 'Whey Isolate Gold', price: 54.99, category: 'Proteins', description: 'Pure whey protein isolate.', benefits: 'Muscle recovery', imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400' },
                { id: 102, name: 'Vegan Multivitamins', price: 24.99, category: 'Vitamins', description: 'Daily multivitamin.', benefits: 'Immunity support', imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400' }
            ];
        }
    }
};

export default productService;
