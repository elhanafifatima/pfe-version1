import { User, Activity, Target, Weight, Ruler, AlertCircle, Heart, Package } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import axios from 'axios';
import orderService from '../services/orderService';

const Profile = () => {
    const { clientId } = useHealth();
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, ordersRes] = await Promise.all([
                    axios.get(`http://localhost:8081/api/profile-sante/${clientId}`),
                    orderService.getPurchaseHistory(clientId)
                ]);
                setProfile(profileRes.data);
                setOrders(ordersRes);
            } catch (err) {
                console.error('Error fetching data', err);
            } finally {
                setLoading(false);
            }
        };
        if (clientId) fetchData();
    }, [clientId]);

    if (loading) return <div className="loading" style={{ padding: '4rem', textAlign: 'center' }}>Loading your dashboard...</div>;
    if (!profile) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>No profile found. Please complete it.</div>;

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Health Dashboard</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Main Stats */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ background: '#e8f5e9', color: '#27ae60', padding: '12px', borderRadius: '12px' }}><User size={24} /></div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{profile.name}</h3>
                            <p style={{ color: '#7f8c8d' }}>{profile.age} years • {profile.sex}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <span style={{ color: '#7f8c8d', display: 'flex', alignItems: 'center', gap: '8px' }}><Weight size={18} /> Weight</span>
                            <span style={{ fontWeight: 600 }}>{profile.weight} kg</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <span style={{ color: '#7f8c8d', display: 'flex', alignItems: 'center', gap: '8px' }}><Ruler size={18} /> Height</span>
                            <span style={{ fontWeight: 600 }}>{profile.height} cm</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <span style={{ color: '#7f8c8d', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={18} /> Goal</span>
                            <span style={{ fontWeight: 600, color: '#27ae60' }}>{profile.goal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                            <span style={{ color: '#7f8c8d', display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={18} /> Activity</span>
                            <span style={{ fontWeight: 600 }}>{profile.activityLevel}</span>
                        </div>
                    </div>
                </div>

                {/* Health & Allergies */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Medical & Dietary</h3>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ fontWeight: 600, color: '#e67e22', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><AlertCircle size={18} /> Allergies</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {profile.allergies?.length > 0 ? profile.allergies.map(a => (
                                <span key={a} style={{ background: '#fdf3e7', color: '#e67e22', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>{a}</span>
                            )) : <span style={{ color: '#bdc3c7' }}>None stated</span>}
                        </div>
                    </div>

                    <div>
                        <p style={{ fontWeight: 600, color: '#e74c3c', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><Heart size={18} /> Health Issues</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {profile.healthIssues?.length > 0 ? profile.healthIssues.map(h => (
                                <span key={h} style={{ background: '#fdeaea', color: '#e74c3c', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>{h}</span>
                            )) : <span style={{ color: '#bdc3c7' }}>None stated</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Order History */}
            <div style={{ marginTop: '3rem', background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Package size={24} color="#27ae60" />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Order History</h3>
                </div>

                {orders.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#7f8c8d', fontSize: '0.9rem' }}>
                                    <th style={{ padding: '1rem' }}>Order ID</th>
                                    <th style={{ padding: '1rem' }}>Products</th>
                                    <th style={{ padding: '1rem' }}>Date</th>
                                    <th style={{ padding: '1rem' }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#7f8c8d' }}>{order.id.substring(0, 8)}...</td>
                                        <td style={{ padding: '1rem', fontWeight: 500 }}>{order.productNames.join(', ')}</td>
                                        <td style={{ padding: '1rem', color: '#7f8c8d' }}>{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem', fontWeight: 700, color: '#2c3e50' }}>${order.totalAmount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#bdc3c7' }}>
                        No orders yet. Start your health journey today!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
