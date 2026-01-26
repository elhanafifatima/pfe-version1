import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, HeartPulse } from 'lucide-react';

const Home = () => {
    return (
        <div>
            <section className="hero">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <h1>Nutrition Designed for Real Life</h1>
                        <p>Elevate your health with science-backed organic products. From diabetic-friendly snacks to premium superfoods, we've curated the best for your body.</p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                                Discover Healthy Products
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <img src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600" alt="Healthy Food" style={{ width: '100%', maxWidth: '500px', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                    </div>
                </div>
            </section>

            <section style={{ background: 'white', padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Why Vitalis?</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Commitment to excellence in every package.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <HeartPulse size={36} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.75rem' }}>Doctor Approved</h3>
                            <p style={{ color: 'var(--text-muted)' }}>All products are vetted by our in-house nutritionists for maximum benefit.</p>
                        </div>
                        <div style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <ShieldCheck size={36} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.75rem' }}>Pure Ingredients</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Non-GMO, organic certified, and zero artificial additives. Just pure nature.</p>
                        </div>
                        <div style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <Zap size={36} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.75rem' }}>Energy Boost</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Designed to optimize your metabolism and natural energy levels throughout the day.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
