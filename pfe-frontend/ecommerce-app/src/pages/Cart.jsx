import React from 'react';
import { Trash2, ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();
    const navigate = useNavigate();

    if (itemCount === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '6rem 0' }}>
                <ShoppingCart size={64} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', opacity: 0.3 }} />
                <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.875rem', fontWeight: '700' }}>Shopping Cart</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2.5rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    {cartItems.map((item) => (
                        <div key={item.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem 0', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                            <div style={{ flexGrow: 1 }}>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{item.name}</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.category}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '6px' }}>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.5rem 0.75rem', border: 'none', background: 'transparent', cursor: 'pointer' }}>-</button>
                                    <span style={{ padding: '0 0.5rem' }}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.5rem 0.75rem', border: 'none', background: 'transparent', cursor: 'pointer' }}>+</button>
                                </div>
                                <span style={{ fontWeight: '700', width: '80px', textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</span>
                                <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'transparent', color: 'var(--error)', cursor: 'pointer', padding: '0.5rem' }}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: '1.5rem' }}>
                        <Link to="/products" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
                            <ArrowLeft size={18} />
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                <div>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', position: 'sticky', top: '100px' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span color="var(--text-muted)">Subtotal ({itemCount} items)</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span color="var(--text-muted)">Shipping</span>
                            <span style={{ color: 'var(--success)' }}>Free</span>
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', margin: '1rem 0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.25rem' }}>
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
                            onClick={() => navigate('/checkout')}
                        >
                            <CreditCard size={20} />
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
