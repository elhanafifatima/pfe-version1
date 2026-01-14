import axios from 'axios';

const PRODUCT_API = 'http://localhost:8082/api/products';

const productService = {
    getProducts: async () => {
        try {
            // return (await axios.get(PRODUCT_API)).data;
            return [
                { id: 1, name: 'Bio Quinoa Selection', price: 12.50, category: 'Gluten-Free', description: 'Premium organic white quinoa.', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
                { id: 2, name: 'Pure Forest Honey', price: 8.99, category: 'Low-Sugar', description: 'Raw honey from local sustainable bees.', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400' },
                { id: 7, name: 'Hearthy Oats (Low GI)', price: 6.50, category: 'Diabetic', description: 'Ideal for glucose management.', image: 'https://images.unsplash.com/photo-1586444248902-2f64eddf13cf?w=400' },
                { id: 3, name: 'Premium Almond Milk', price: 4.20, category: 'Dairy-Free', description: 'Natural unsweetened dairy alternative.', image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400' },
                { id: 4, name: 'Organic Chia Seeds', price: 7.50, category: 'Superfood', description: 'Rich in fiber and omega-3.', image: 'https://images.unsplash.com/photo-1511216113906-8f57bb83e776?w=400' },
                { id: 5, name: 'Vitality Green Juice', price: 5.99, category: 'Vitamin Boost', description: 'Cold pressed organic nutrients.', image: 'https://images.unsplash.com/photo-1622597467822-54576fe3d1ce?w=400' }
            ];
        } catch (e) { return []; }
    }
};
export default productService;
