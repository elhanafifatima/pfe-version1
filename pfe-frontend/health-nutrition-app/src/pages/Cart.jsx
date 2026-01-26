import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBasket, Trash2, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useHealth } from '../context/HealthContext';
import orderService from '../services/orderService';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();
    const { clientId } = useHealth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        try {
            const orderData = {
                clientId: clientId,
                productNames: items.map(item => `${item.name} (x${item.quantity})`),
                totalAmount: total
            };
            await orderService.placeOrder(orderData);
            clearCart();
            navigate('/profile', { state: { orderSuccess: true } });
        } catch (error) {
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '3rem' }}>My Basket ({itemCount})</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
                <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                    {items.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                            <div style={{ flexGrow: 1 }}>
                                <h4 style={{ fontWeight: 700 }}>{item.name}</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>${item.price.toFixed(2)}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '6px' }}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.2rem 0.6rem', border: 'none', background: 'none', cursor: 'pointer' }}>-</button>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.2rem 0.6rem', border: 'none', background: 'none', cursor: 'pointer' }}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--error)', background: 'none', border: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                            <div style={{ fontWeight: 800, fontSize: '1.125rem' }}>${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    ))}
                </div>

                <aside>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9375rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Calculated at checkout</span>
                        </div>
                        <div style={{ borderTop: '2px solid var(--border)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>Total</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)' }}>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                            Proceed to Checkout
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
