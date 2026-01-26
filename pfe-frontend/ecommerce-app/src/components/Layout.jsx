import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Search, ShoppingCart, Menu, X, Filter, Facebook, Twitter, Instagram } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
    const { itemCount } = useCart();

    return (
        <header className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="logo">
                        <ShoppingBag size={32} />
                        <span>PFE Shop</span>
                    </Link>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'inherit', textDecoration: 'none', fontWeight: 600 })}>Home</NavLink>
                        <NavLink to="/products" style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'inherit', textDecoration: 'none', fontWeight: 600 })}>Products</NavLink>
                    </div>

                    <div className="nav-actions">
                        <div style={{ position: 'relative', display: 'none', md: 'block' }}>
                            <Search size={20} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" placeholder="Search products..." className="form-input" style={{ paddingLeft: '2.5rem', width: '200px', height: '40px' }} />
                        </div>
                        <Link to="/cart" className="cart-icon">
                            <ShoppingCart size={24} />
                            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export const Sidebar = () => (
    <aside className="sidebar">
        <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter size={18} />
                Filters
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>Categories</p>
                <ul style={{ listStyle: 'none', fontSize: '0.875rem' }}>
                    <li style={{ padding: '0.5rem 0' }}><input type="checkbox" /> Electronics</li>
                    <li style={{ padding: '0.5rem 0' }}><input type="checkbox" /> Audio</li>
                    <li style={{ padding: '0.5rem 0' }}><input type="checkbox" /> Wearables</li>
                    <li style={{ padding: '0.5rem 0' }}><input type="checkbox" /> Furniture</li>
                </ul>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>Price Range</p>
                <input type="range" style={{ width: '100%' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    <span>$0</span>
                    <span>$2000</span>
                </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Apply Filters</button>
        </div>
    </aside>
);

export const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '2rem' }}>
                <div>
                    <div className="logo" style={{ marginBottom: '1rem' }}>
                        <ShoppingBag size={24} />
                        <span>PFE Shop</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Providing high-quality professional equipment for your business needs.
                    </p>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '0.5rem' }}>About Us</li>
                        <li style={{ marginBottom: '0.5rem' }}>Privacy Policy</li>
                        <li style={{ marginBottom: '0.5rem' }}>Terms of Service</li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1rem' }}>Connect</h4>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Facebook size={20} />
                        <Twitter size={20} />
                        <Instagram size={20} />
                    </div>
                </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                &copy; 2026 PFE E-commerce Project. All rights reserved.
            </div>
        </div>
    </footer>
);
