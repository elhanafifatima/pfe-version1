import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        productService.getAllProducts().then(data => setFeaturedProducts(data.slice(0, 3)));
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600") no-repeat center center',
                backgroundSize: 'cover',
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                marginBottom: '4rem',
                borderRadius: '16px'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Premium Gear for Professionals</h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Upgrade your workstation with the latest technology and ergonomic furniture.
                    </p>
                    <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                        Shop Catalog
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="container" style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <div style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '12px' }}>
                        <div style={{ background: '#eff6ff', color: 'var(--primary)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 1.5rem', justifyContent: 'center' }}>
                            <Truck size={32} />
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Fast Delivery</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Free shipping on orders over $500.</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '12px' }}>
                        <div style={{ background: '#fff7ed', color: '#f59e0b', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 1.5rem', justifyContent: 'center' }}>
                            <Star size={32} />
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Top Quality</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Curated selection of professional brands.</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '12px' }}>
                        <div style={{ background: '#f0fdf4', color: '#22c55e', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 1.5rem', justifyContent: 'center' }}>
                            <ShieldCheck size={32} />
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Secure Checkout</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Your transactions are always protected.</p>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="container" style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Featured Products</h2>
                    <Link to="/products" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>View All</Link>
                </div>
                <div className="product-grid">
                    {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>
        </div>
    );
};

export default Home;
