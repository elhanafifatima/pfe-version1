import { useHealth } from '../context/HealthContext';
import { useCart } from '../context/CartContext';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Leaf } from 'lucide-react';

export const Navbar = () => {
    const { hasProfile } = useHealth();
    const { itemCount } = useCart();

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo">
                    <Leaf size={28} />
                    <span>Vitalis</span>
                </Link>
                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
                    <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Products</NavLink>

                    {hasProfile && (
                        <>
                            <NavLink to="/cart" className="nav-link" style={{ position: 'relative' }}>
                                <ShoppingCart size={22} />
                                {itemCount > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: '#27ae60', color: 'white', fontSize: '0.7rem', height: '18px', width: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{itemCount}</span>}
                            </NavLink>
                            <NavLink to="/profile" className="nav-link"><User size={22} /></NavLink>
                        </>
                    )}

                    {!hasProfile && (
                        <Link to="/ProfileSante" className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>Start Health Profile</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                <div>
                    <div className="logo" style={{ marginBottom: '1.25rem' }}>
                        <Leaf size={24} />
                        <span>Vitalis</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Your trusted partner for organic nutrition and healthy living. Quality guaranteed by experts.</p>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1rem' }}>Categories</h4>
                    <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>Gluten-Free</li>
                        <li>Organic Foods</li>
                        <li>Superfoods</li>
                        <li>Natural Supplements</li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1rem' }}>Contact</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>hello@vitalis.com</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>+1 (800) VITALIS</p>
                </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                &copy; 2026 Vitalis Health Store. Powered by Microservices.
            </div>
        </div>
    </footer>
);
