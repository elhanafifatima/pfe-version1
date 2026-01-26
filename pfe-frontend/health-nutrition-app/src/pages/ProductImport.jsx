import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const ProductImport = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage('');
        setError('');
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8084/api/products/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage(response.data);
            setFile(null);
        } catch (err) {
            setError('Import failed. Please check the file format.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ background: '#e8f5e9', color: '#27ae60', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <Upload size={32} />
                </div>
                <h2 style={{ fontWeight: 800 }}>Import Products</h2>
                <p style={{ color: '#7f8c8d' }}>Upload your nutritional data from Kaggle (Excel/CSV)</p>
            </div>

            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ position: 'relative', border: '2px dashed #ddd', borderRadius: '12px', padding: '3rem', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.3s' }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); setFile(e.dataTransfer.files[0]); }}>
                    <input type="file" onChange={handleFileChange} style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
                    <FileText size={48} style={{ color: '#bdc3c7', marginBottom: '1rem' }} />
                    <p style={{ fontWeight: 600 }}>{file ? file.name : 'Click or drag file here'}</p>
                    <p style={{ fontSize: '0.8rem', color: '#bdc3c7' }}>Supports .xlsx and .csv</p>
                </div>

                {message && <div style={{ background: '#e8f5e9', color: '#27ae60', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={18} /> {message}</div>}
                {error && <div style={{ background: '#fdeaea', color: '#e74c3c', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={18} /> {error}</div>}

                <button
                    type="submit"
                    disabled={loading || !file}
                    style={{
                        padding: '1rem',
                        background: loading ? '#bdc3c7' : '#27ae60',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                >
                    {loading ? 'Processing...' : 'Upload & Import'}
                </button>
            </form>
        </div>
    );
};

export default ProductImport;
