import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
    const navigate = useNavigate();

    if (totalItems === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '8rem 0' }}>
                <ShoppingCart size={64} style={{ margin: '0 auto 1.5rem', color: 'var(--border)' }} />
                <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Start browsing our products to add some items!</p>
                <Link to="/products" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem' }}>Your Basket</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem' }}>
                {/* List of items */}
                <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                    {cart.map((item) => (
                        <div key={item.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                            <div style={{ flexGrow: 1 }}>
                                <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{item.name}</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>${item.price.toFixed(2)}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '6px' }}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.25rem 0.75rem', border: 'none', background: 'none', cursor: 'pointer' }}>-</button>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.25rem 0.75rem', border: 'none', background: 'none', cursor: 'pointer' }}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--error)', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', fontWeight: 800, fontSize: '1.125rem' }}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <aside>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span color="var(--text-muted)">Subtotal</span>
                            <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <span color="var(--text-muted)">Shipping</span>
                            <span style={{ color: 'var(--success)', fontWeight: 600 }}>Free</span>
                        </div>
                        <div style={{ borderTop: '2px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>Total</span>
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>${subtotal.toFixed(2)}</span>
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={() => navigate('/checkout')}>
                            Checkout Now
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
