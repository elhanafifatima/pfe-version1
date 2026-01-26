import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';
import axios from 'axios';

const ProfileSante = () => {
    const { clientId, updateProfileStatus } = useHealth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        sex: 'Other',
        height: '',
        weight: '',
        goal: 'Maintenance',
        activityLevel: 'Moderate',
        allergies: '',
        healthIssues: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                clientId: clientId,
                name: formData.name,
                age: parseInt(formData.age),
                sexe: formData.sex,
                taille: parseFloat(formData.height),  // ⚠ map height -> taille
                poids: parseFloat(formData.weight),  // ⚠ map weight -> poids
                objectifsSante: formData.goal,
                niveauActivite: formData.activityLevel,
                allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
                maladies: formData.healthIssues ? formData.healthIssues.split(',').map(s => s.trim()) : []
            };


            await axios.post('http://localhost:8081/api/profile-sante', payload);
            updateProfileStatus(true, formData.goal);
            navigate('/products');
        } catch (err) {
            console.error("Error saving profile:", err);
            setError('Failed to save profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ProfileSante-container" style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h1 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '10px' }}>Your Health Profile</h1>
            <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '30px' }}>Please complete your health profile to access our nutritional catalog.</p>

            {error && <div style={{ color: '#e74c3c', textAlign: 'center', marginBottom: '20px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Sex</label>
                        <select name="sex" value={formData.sex} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Height (cm)</label>
                        <input type="number" name="height" value={formData.height} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Weight (kg)</label>
                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Goal</label>
                    <select name="goal" value={formData.goal} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <option value="Weight Loss">Weight Loss</option>
                        <option value="Muscle Gain">Muscle Gain</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Activity Level</label>
                    <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Intense">Intense</option>
                    </select>
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Allergies (Optional, comma separated)</label>
                    <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} placeholder="e.g. Peanuts, Dairy" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Health Issues (Optional, comma separated)</label>
                    <input type="text" name="healthIssues" value={formData.healthIssues} onChange={handleChange} placeholder="e.g. Diabetes, Hypertension" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: '10px',
                        padding: '12px',
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                >
                    {loading ? 'Saving...' : 'Finish Profile & Start Shopping'}
                </button>
            </form>
        </div>
    );
};

export default ProfileSante;
