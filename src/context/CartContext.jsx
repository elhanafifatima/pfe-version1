import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [items, setItems] = useState([]);
    useEffect(() => {
        if (!isAuthenticated) setItems([]);
        else { const s = localStorage.getItem('vitalis_cart'); if (s) setItems(JSON.parse(s)); }
    }, [isAuthenticated]);
    useEffect(() => { if (isAuthenticated) localStorage.setItem('vitalis_cart', JSON.stringify(items)); }, [items, isAuthenticated]);
    const addToCart = (p) => {
        if (!isAuthenticated) return;
        setItems(prev => {
            const ex = prev.find(i => i.id === p.id);
            if (ex) return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
            return [...prev, { ...p, quantity: 1 }];
        });
    };
    const removeFromCart = (id) => setItems(prev => prev.filter(i => i.id !== id));
    const updateQuantity = (id, q) => { if (q < 1) return; setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: q } : i)); };
    const clearCart = () => setItems([]);
    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total: items.reduce((a, b) => a + (b.price * b.quantity), 0), itemCount: items.reduce((a, b) => a + b.quantity, 0) }}>
            {children}
        </CartContext.Provider>
    );
};
