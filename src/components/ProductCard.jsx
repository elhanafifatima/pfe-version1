import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <div className="product-body">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                        style={{ padding: '0.5rem 1rem' }}
                    >
                        <Plus size={18} />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
