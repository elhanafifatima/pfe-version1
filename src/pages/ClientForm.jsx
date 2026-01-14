import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import FormInput from '../components/FormInput';
import { useCart } from '../context/CartContext';

const ClientForm = () => {
    const { subtotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: ''
    });

    const [errors, setErrors] = useState({});

    /**
     * Only allows letters in name fields.
     */
    const handleNameKeyPress = (e) => {
        const charCode = e.charCode;
        // Allow only alphabetical characters and spaces
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
            e.preventDefault();
        }
    };

    /**
     * Only allows digits in phone field.
     */
    const handlePhoneKeyPress = (e) => {
        const charCode = e.charCode;
        // Allow only digits (0-9)
        if (charCode < 48 || charCode > 57) {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user changes field
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};

        // First Name / Last Name validation
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Format must be: example@domain.com';

        // Phone validation (10-13 digits)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (!formData.phone) newErrors.phone = 'Telephone is required';
        else if (phoneDigits.length < 10 || phoneDigits.length > 13) newErrors.phone = 'Must be between 10 and 13 digits';

        // Date validation (not in future)
        if (!formData.birthDate) {
            newErrors.birthDate = 'Date is required';
        } else {
            const selectedDate = new Date(formData.birthDate);
            const today = new Date();
            if (selectedDate > today) newErrors.birthDate = 'Date cannot be in the future';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSuccess(true);
            setTimeout(() => {
                clearCart();
                navigate('/');
            }, 3500);
        }
    };

    if (isSuccess) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '6rem 0' }}>
                <CheckCircle size={80} style={{ color: 'var(--success)', marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Order Confirmed!</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '2.5rem' }}>
                    Thank you, {formData.firstName}. Your order has been placed successfully.<br />
                    A confirmation email has been sent to {formData.email}.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    <p>Redirecting to home page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline"
                    style={{ marginBottom: '2rem', border: 'none', padding: '0', color: 'var(--text-muted)' }}
                >
                    <ArrowLeft size={18} /> Back to basket
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3rem' }}>
                    {/* Form */}
                    <main>
                        <div className="form-card" style={{ margin: 0, maxWidth: 'none' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Final Step</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Please provide your checkout details to complete the purchase.</p>

                            <form onSubmit={handleSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <FormInput
                                        label="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        onKeyPress={handleNameKeyPress}
                                        error={errors.firstName}
                                        placeholder="Enter letters only"
                                        required
                                    />
                                    <FormInput
                                        label="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        onKeyPress={handleNameKeyPress}
                                        error={errors.lastName}
                                        placeholder="Enter letters only"
                                        required
                                    />
                                </div>
                                <FormInput
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    placeholder="example@domain.com"
                                    required
                                />
                                <FormInput
                                    label="Telephone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onKeyPress={handlePhoneKeyPress}
                                    error={errors.phone}
                                    placeholder="10-13 digits (numbers only)"
                                    required
                                />
                                <FormInput
                                    label="Important Date"
                                    name="birthDate"
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    error={errors.birthDate}
                                    required
                                />

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
                                    Confirm Order (${subtotal.toFixed(2)})
                                </button>
                            </form>
                        </div>
                    </main>

                    {/* Secure Info Panel */}
                    <aside>
                        <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                                <ShieldCheck size={24} />
                                <h4 style={{ fontWeight: 700 }}>Secure Purchase</h4>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Your information is highly protected. We use bank-level encryption to ensure your data is safe and never shared with third parties.
                            </p>
                            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <span>Total Amount</span>
                                    <span style={{ fontWeight: 800 }}>${subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                    <span>Items</span>
                                    <span style={{ fontWeight: 600 }}>{subtotal > 0 ? 'Verified' : '0'}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ClientForm;
