import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, ArrowLeft, Send } from 'lucide-react';
import FormInput from '../components/FormInput';
import { useCart } from '../context/CartContext';

const ClientForm = () => {
    const { cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        orderDate: new Date().toISOString().split('T')[0],
        address: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        // Name & Surname: only letters
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        else if (!nameRegex.test(formData.firstName)) newErrors.firstName = 'Only letters allowed';

        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        else if (!nameRegex.test(formData.lastName)) newErrors.lastName = 'Only letters allowed';

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';

        // Phone: digits only, 10-13 length
        const phoneRegex = /^\d{10,13}$/;
        if (!formData.phone) newErrors.phone = 'Phone is required';
        else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Must be 10-13 digits';

        // Date validation
        if (!formData.orderDate) newErrors.orderDate = 'Date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
            setTimeout(() => {
                clearCart();
                navigate('/');
            }, 3000);
        }
    };

    if (submitted) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '6rem 0' }}>
                <CheckCircle size={80} style={{ color: 'var(--success)', marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Order Confirmed!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Thank you for your purchase, {formData.firstName}. We'll send a confirmation to {formData.email}.
                </p>
                <p>Redirecting to home...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '1.5rem', fontWeight: '500' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2.5rem' }}>
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem' }}>Shipping Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <FormInput
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                error={errors.firstName}
                                required
                            />
                            <FormInput
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                error={errors.lastName}
                                required
                            />
                        </div>
                        <FormInput
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />
                        <FormInput
                            label="Phone Number"
                            name="phone"
                            placeholder="0612345678"
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            required
                        />
                        <FormInput
                            label="Preferred Date"
                            name="orderDate"
                            type="date"
                            value={formData.orderDate}
                            onChange={handleChange}
                            error={errors.orderDate}
                            required
                        />
                        <div className="form-group">
                            <label className="form-label">Address</label>
                            <textarea
                                className="form-input"
                                name="address"
                                rows="3"
                                style={{ resize: 'vertical' }}
                                value={formData.address}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1.125rem' }}>
                            Complete Purchase
                            <Send size={18} />
                        </button>
                    </form>
                </div>

                <div>
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Amount</span>
                            <span style={{ fontWeight: '600' }}>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.875rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Tax</span>
                            <span style={{ fontWeight: '600' }}>$0.00</span>
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: '800' }}>
                            <span>Total</span>
                            <span style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fefce8', border: '1px solid #fef08a', borderRadius: '8px', display: 'flex', gap: '0.75rem' }}>
                        <AlertTriangle size={20} style={{ color: '#ca8a04', flexShrink: 0 }} />
                        <p style={{ fontSize: '0.75rem', color: '#854d0e' }}>
                            Please double-check your shipping details before confirming.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientForm;
