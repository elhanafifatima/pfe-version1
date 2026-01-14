import React from 'react';

const FormInput = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    onKeyPress,
    error,
    placeholder,
    required = false
}) => {
    return (
        <div className="form-group">
            <label className="label">
                {label} {required && <span style={{ color: 'var(--error)' }}>*</span>}
            </label>
            <input
                type={type}
                name={name}
                className={`input ${error ? 'error' : ''}`}
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                placeholder={placeholder}
                required={required}
            />
            {error && <p className="error-msg">{error}</p>}
        </div>
    );
};

export default FormInput;
