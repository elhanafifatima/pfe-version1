import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, HeartPulse } from 'lucide-react';

const Home = () => (
    <div>
        <section className="hero">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                <div>
                    <h1>Nutrition Designed for Real Life</h1>
                    <p>Elevate your health with science-backed organic products. From diabetic-friendly snacks to premium superfoods.</p>
                    <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Discover Healthy Products <ArrowRight size={20} /></Link>
                </div>
                <div style={{ textAlign: 'right' }}><img src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600" alt="Health" style={{ width: '100%', maxWidth: '500px', borderRadius: '24px' }} /></div>
            </div>
        </section>
        <section style={{ background: 'white', padding: '6rem 0' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                <div><HeartPulse size={36} color="var(--primary)" /><h3>Doctor Approved</h3><p>Vetted by our in-house nutritionists.</p></div>
                <div><ShieldCheck size={36} color="var(--primary)" /><h3>Pure Ingredients</h3><p>Non-GMO and organic certified.</p></div>
                <div><Zap size={36} color="var(--primary)" /><h3>Energy Boost</h3><p>Optimize your natural energy levels.</p></div>
            </div>
        </section>
    </div>
);
export default Home;
