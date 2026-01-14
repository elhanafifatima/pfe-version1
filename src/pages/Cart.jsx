import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBasket, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();
    const navigate = useNavigate();

    if (itemCount === 0) return <div className="container" style={{ textAlign: 'center', padding: '8rem 0' }}><ShoppingBasket size={64} /><p>Basket is empty</p><Link to="/products" className="btn btn-primary">Shop Now</Link></div>;

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h2>My Basket ({itemCount})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
                <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    {items.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                            <img src={item.image} alt="" style={{ width: '80px', height: '80px', borderRadius: '12px' }} />
                            <div style={{ flexGrow: 1 }}>
                                <h4>{item.name}</h4><p>${item.price.toFixed(2)}</p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    <button onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button>
                                </div>
                            </div>
                            <div style={{ fontWeight: 800 }}>${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    ))}
                </div>
                <aside style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <h3>Total: ${total.toFixed(2)}</h3>
                    <button onClick={() => { alert('Checkout!'); clearCart(); navigate('/profile'); }} className="btn btn-primary" style={{ width: '100%' }}>Checkout</button>
                </aside>
            </div>
        </div>
    );
};
export default Cart;
