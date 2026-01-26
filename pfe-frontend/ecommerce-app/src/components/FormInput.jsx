import React from 'react';

const FormInput = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
    required = false
}) => {
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={name}>
                {label} {required && <span style={{ color: 'var(--error)' }}>*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                className={`form-input ${error ? 'error' : ''}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default FormInput;
