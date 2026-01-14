import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [maxPrice, setMaxPrice] = useState(2000);

    useEffect(() => {
        productService.getProducts().then(data => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        p.price <= maxPrice
    );

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Our Products</h2>
                <p style={{ color: 'var(--text-muted)' }}>Quality gear for professionals and enthusiasts.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
                {/* Filters Panel */}
                <aside>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Filter size={20} /> Filters
                        </h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <label className="label">Search By Name</label>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    className="input"
                                    style={{ paddingLeft: '2.5rem' }}
                                    placeholder="Type product name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                Max Price <span>${maxPrice}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                step="50"
                                className="input"
                                style={{ padding: 0 }}
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                            />
                        </div>

                        <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem' }} onClick={() => { setSearchTerm(''); setMaxPrice(2000); }}>
                            Reset Filters
                        </button>
                    </div>
                </aside>

                {/* Product Grid */}
                <main>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '5rem' }}>Loading catalog...</div>
                    ) : (
                        <>
                            {filteredProducts.length > 0 ? (
                                <div className="product-grid" style={{ paddingTop: 0 }}>
                                    {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '5rem', backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--border)' }}>
                                    <p style={{ color: 'var(--text-muted)' }}>No products found matching your filters.</p>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;
