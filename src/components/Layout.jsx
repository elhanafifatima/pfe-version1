import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Info, Phone, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
    const { totalItems } = useCart();

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo">
                    <ShoppingBag size={28} />
                    <span>ShopPro</span>
                </Link>
                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
                    <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Products</NavLink>
                    <Link to="/cart" className="cart-btn">
                        <ShoppingCart size={24} />
                        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                <div>
                    <div className="logo" style={{ marginBottom: '1rem' }}>
                        <ShoppingBag size={24} />
                        <span>ShopPro</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Premium e-commerce platform for high-quality products. Join our community of happy customers worldwide.
                    </p>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1.25rem' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                        <li><Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link></li>
                        <li><Link to="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>All Products</Link></li>
                        <li><Link to="/cart" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Your Cart</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1.25rem' }}>Contact Info</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> support@shoppro.com</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> +1 (555) 123-4567</li>
                    </ul>
                </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                &copy; 2026 ShopPro Microservices Project. All rights reserved.
            </div>
        </div>
    </footer>
);
