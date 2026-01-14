import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield } from 'lucide-react';

const Home = () => {
    return (
        <div>
            <section className="hero">
                <div className="container">
                    <h1>Modern Selection for Every Lifestyle</h1>
                    <p>Discover a curated collection of premium products designed to elevate your daily routine. Quality meets elegance.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/products" className="btn btn-primary">
                            View Products
                            <ArrowRight size={20} />
                        </Link>
                        <Link to="/products" className="btn btn-outline">Explore Categories</Link>
                    </div>
                </div>
            </section>

            <section style={{ backgroundColor: 'white', padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ background: '#eff6ff', color: 'var(--primary)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Truck size={32} />
                            </div>
                            <h3 style={{ marginBottom: '0.75rem' }}>Fast Shipping</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Reliable delivery right to your doorstep within 48 hours.</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ background: '#fef3c7', color: '#d97706', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Star size={32} />
                            </div>
                            <h3 style={{ marginBottom: '0.75rem' }}>Top Quality</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>We only partner with brands that share our commitment to excellence.</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ background: '#ecfdf5', color: '#059669', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Shield size={32} />
                            </div>
                            <h3 style={{ marginBottom: '0.75rem' }}>Secure Payments</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Your data is protected by industry-leading encryption standards.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
