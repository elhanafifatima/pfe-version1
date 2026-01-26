import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import { Sidebar } from '../components/Layout';
import { Search } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        productService.getAllProducts().then(data => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="app-layout">
                <Sidebar />
                <main className="main-content" style={{ paddingLeft: '2rem' }}>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Our Collection</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Explore the best professional gear on the market.</p>
                    </div>

                    <div style={{ position: 'relative', marginBottom: '2rem', maxWidth: '400px' }}>
                        <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Filter by name or category..."
                            className="form-input"
                            style={{ paddingLeft: '2.5rem' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading products...</div>
                    ) : (
                        <div className="product-grid">
                            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                            {filteredProducts.length === 0 && <p>No products found matching your search.</p>}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;
