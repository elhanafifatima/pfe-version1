import React, { useState, useEffect } from 'react';
import { User, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orderService';
import authService from '../services/authService';

const Profile = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [h, p] = await Promise.all([orderService.getPurchaseHistory(), authService.getProfile()]);
                setHistory(h); setProfile(p);
            } finally { setLoading(false); }
        };
        fetch();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '3rem' }}>
                <aside style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <User size={64} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                        <h3>{profile?.firstName} {profile?.lastName}</h3>
                        <p>{profile?.email}</p><p>{profile?.phone}</p>
                    </div>
                </aside>
                <main style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <h3><Package size={24} /> Purchase History</h3>
                    <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
                        <thead><tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}><th>Order ID</th><th>Product</th><th>Date</th><th>Price</th></tr></thead>
                        <tbody>
                            {history.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem 0' }}>{item.id}</td><td style={{ fontWeight: 600 }}>{item.name}</td><td>{item.purchaseDate}</td><td style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>${item.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
};
export default Profile;
