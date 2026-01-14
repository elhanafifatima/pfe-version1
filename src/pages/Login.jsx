import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import FormInput from '../components/FormInput';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { const u = await authService.login(formData); login(u); navigate('/products'); } catch (err) { alert('Failed'); }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}><h2>Sign In</h2></div>
                <form onSubmit={handleSubmit}>
                    <FormInput label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <FormInput label="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Login</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>New here? <Link to="/register" style={{ color: 'var(--primary)' }}>Register</Link></p>
            </div>
        </div>
    );
};
export default Login;
