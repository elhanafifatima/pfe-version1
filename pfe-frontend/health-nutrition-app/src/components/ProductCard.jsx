import { ShoppingCart } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { hasProfile } = useHealth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    return (
        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <img src={product.imageUrl || product.image || 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400'} alt={product.nom} className="card-image" style={{ height: '220px', objectFit: 'cover' }} />
            <div className="card-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="badge">{product.categories === 1 ? 'Proteins' : product.categories === 2 ? 'Vitamins' : 'Supplements'}</span>
                <h3 className="card-title">{product.nom}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{product.description}</p>
                <p style={{ fontSize: '0.8rem', color: '#27ae60', fontWeight: '500', marginBottom: '1rem' }}>{product.benefits || 'High quality nutrition'}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="card-price" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{product.prix?.toFixed(2)}€</span>
                    <button
                        className="btn btn-primary"
                        onClick={() => hasProfile ? addToCart(product) : navigate('/health-profile')}
                        style={{ padding: '0.5rem 1rem' }}
                    >
                        <ShoppingCart size={18} />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
