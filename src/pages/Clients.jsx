import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import { Button, Input, Table } from '../components/ui';
import clientService from '../services/clientService';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const data = await clientService.getAllClients();
            setClients(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch clients from microservice.');
            // Mock data if service fails (for demo purposes)
            setClients([
                { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', company: 'TechCorp' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', company: 'DesignCo' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            try {
                await clientService.deleteClient(id);
                setClients(clients.filter(c => c.id !== id));
            } catch (err) {
                alert('Error deleting client.');
            }
        }
    };

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Clients</h1>
                    <p style={{ color: '#64748b' }}>Manage your application clients</p>
                </div>
                <Button onClick={() => navigate('/add-client')} icon={Plus}>Add Client</Button>
            </div>

            <div className="card">
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative', flexGrow: 1 }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            className="input"
                            placeholder="Search clients..."
                            style={{ paddingLeft: '2.5rem' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="secondary" onClick={fetchClients} icon={RefreshCw}>Refresh</Button>
                </div>

                {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</div>}

                <Table
                    headers={['Name', 'Email', 'Phone', 'Company', 'Actions']}
                    data={filteredClients}
                    renderRow={(client) => (
                        <tr key={client.id}>
                            <td style={{ fontWeight: '500' }}>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.company}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => navigate(`/edit-client/${client.id}`)} style={{ border: 'none', background: 'none', color: '#2563eb', cursor: 'pointer' }}>
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(client.id)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                />

                {loading && <div style={{ textAlign: 'center', padding: '1rem' }}>Loading data...</div>}
            </div>
        </div>
    );
};

export default Clients;
