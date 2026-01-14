import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => { productService.getProducts().then(d => { setProducts(d); setLoading(false); }); }, []);

    const categories = ['All', 'Gluten-Free', 'Low-Sugar', 'Dairy-Free', 'Superfood', 'Diabetic'];
    const filtered = products.filter(p => (filter === 'All' || p.category === filter) && p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <header style={{ marginBottom: '3.5rem' }}><h2>Healthy Market</h2><p>Expertly selected nutrition.</p></header>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                <input type="text" className="input" style={{ maxWidth: '300px' }} placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                {categories.map(c => <button key={c} onClick={() => setFilter(c)} className={`btn ${filter === c ? 'btn-primary' : 'btn-outline'}`}>{c}</button>)}
            </div>
            {loading ? <div className="loading">Loading...</div> : <div className="product-grid">{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div>}
        </div>
    );
};
export default Products;
