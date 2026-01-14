import axios from 'axios';
const orderService = {
    getPurchaseHistory: async () => [
        { id: 'ORD-101', name: 'Organic Quinoa', purchaseDate: '2026-01-10', price: 12.50 },
        { id: 'ORD-102', name: 'Almond Milk', purchaseDate: '2026-01-08', price: 4.20 }
    ]
};
export default orderService;
