import React from 'react';
const FormInput = ({ label, name, type = 'text', value, onChange, error, placeholder, required = false, restriction = 'none' }) => {
    const handleKeyPress = (e) => {
        const charCode = e.charCode;
        if (restriction === 'letters') { if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) e.preventDefault(); }
        else if (restriction === 'digits') { if (charCode < 48 || charCode > 57) e.preventDefault(); }
    };
    return (
        <div className="form-group">
            <label className="label">{label} {required && <span style={{ color: 'var(--error)' }}>*</span>}</label>
            <input type={type} name={name} className={`input ${error ? 'error' : ''}`} value={value} onChange={onChange} onKeyPress={handleKeyPress} placeholder={placeholder} required={required} />
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};
export default FormInput;
