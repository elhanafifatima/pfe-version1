import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button, Input } from '../components/ui';
import clientService from '../services/clientService';

const AddClient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: ''
    });

    useEffect(() => {
        if (id) {
            fetchClient();
        }
    }, [id]);

    const fetchClient = async () => {
        try {
            const client = await clientService.getClientById(id);
            setFormData(client);
        } catch (err) {
            console.error('Error fetching client details');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await clientService.updateClient(id, formData);
            } else {
                await clientService.createClient(formData);
            }
            navigate('/clients');
        } catch (err) {
            alert('Error saving client. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', background: 'none', color: '#64748b', cursor: 'pointer', marginBottom: '1.5rem' }}
            >
                <ArrowLeft size={18} />
                Back to list
            </button>

            <div className="card">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {id ? 'Edit Client' : 'Add New Client'}
                </h1>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                    Please fill in the information below
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input
                            label="Full Name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Phone Number"
                            name="phone"
                            placeholder="123-456-7890"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <Input
                            label="Company"
                            name="company"
                            placeholder="TechCorp"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <label className="label">Address</label>
                        <textarea
                            name="address"
                            className="input"
                            rows="3"
                            placeholder="123 Street, City, Country"
                            value={formData.address}
                            onChange={handleChange}
                            style={{ resize: 'vertical' }}
                        ></textarea>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <Button variant="secondary" onClick={() => navigate('/clients')}>Cancel</Button>
                        <Button type="submit" icon={Save} disabled={loading}>
                            {loading ? 'Saving...' : id ? 'Update Client' : 'Save Client'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClient;
