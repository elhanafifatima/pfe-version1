import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHealth } from './HealthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { hasProfile } = useHealth();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('vitalis_cart');
        if (savedCart) setItems(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem('vitalis_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product) => {
        if (!hasProfile) return;
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((acc, item) => acc + (item.prix * item.quantity), 0);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};
