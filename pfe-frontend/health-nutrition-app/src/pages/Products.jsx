import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Sparkles } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import axios from 'axios';

const Products = () => {
    const { goal } = useHealth();
    const [products, setProducts] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [allRes, recoRes] = await Promise.all([
                    productService.getProducts(),
                    axios.get(`http://localhost:8084/api/products/recommendations?goal=${goal}`)
                ]);
                setProducts(allRes);
                setRecommendations(recoRes.data);
            } catch (err) {
                console.error("Error fetching products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [goal]);

    const categories = ['All', 'Proteins', 'Vitamins', 'Supplements', 'Performance', 'Minerals'];

    const filtered = products.filter(p =>
        (filter === 'All' || p.category === filter) &&
        p.nom?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <header style={{ marginBottom: '3.5rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Healthy Market</h2>
                <p style={{ color: 'var(--text-muted)' }}>Expertly selected nutrition tailored for your <strong>{goal}</strong> goal.</p>
            </header>

            {recommendations.length > 0 && !search && filter === 'All' && (
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <Sparkles color="#27ae60" fill="#27ae60" size={24} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Recommended for You</h3>
                    </div>
                    <div className="product-grid">
                        {recommendations.map(p => <ProductCard key={p.id} product={p} highlighted />)}
                    </div>
                </section>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        className="input"
                        style={{ paddingLeft: '2.5rem' }}
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.2rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="loading">Initializing catalog...</div>
            ) : (
                <div className="product-grid">
                    {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                    {filtered.length === 0 && <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No products found in this category.</p>}
                </div>
            )}
        </div>
    );
};

export default Products;
