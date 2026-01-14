import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import authService from '../services/authService';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', birthDate: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authService.register(formData);
        alert('Success! Please login.');
        navigate('/login');
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', width: '100%', maxWidth: '500px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <FormInput label="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} restriction="letters" required />
                        <FormInput label="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} restriction="letters" required />
                    </div>
                    <FormInput label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <FormInput label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} restriction="digits" required />
                    <FormInput label="Birth Date" type="date" value={formData.birthDate} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })} required />
                    <FormInput label="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Register</button>
                </form>
            </div>
        </div>
    );
};
export default Register;
