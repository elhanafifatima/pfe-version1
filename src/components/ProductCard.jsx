import React from 'react';
import { ShoppingCart, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
const ProductCard = ({ product }) => {
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    return (
        <div className="card">
            <img src={product.image} alt={product.name} className="card-image" />
            <div className="card-body">
                <span className="badge">{product.category}</span>
                <h3 className="card-title">{product.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', flexGrow: 1 }}>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="card-price">${product.price.toFixed(2)}</span>
                    {isAuthenticated ? (
                        <button className="btn btn-primary" onClick={() => addToCart(product)}><ShoppingCart size={18} />Add</button>
                    ) : (
                        <button className="btn btn-outline" onClick={() => navigate('/login')} title="Login to add to cart"><LogIn size={18} />Login</button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
