import React from 'react';

export const Button = ({ children, variant = 'primary', icon: Icon, onClick, type = 'button', className = '' }) => (
    <button
        type={type}
        onClick={onClick}
        className={`btn btn-${variant} ${className}`}
    >
        {Icon && <Icon size={18} />}
        {children}
    </button>
);

export const Input = ({ label, type = 'text', value, onChange, placeholder, required = false, name }) => (
    <div className="input-group">
        {label && <label className="label">{label}</label>}
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="input"
        />
    </div>
);

export const Table = ({ headers, data, renderRow }) => (
    <div className="table-container">
        <table className="table">
            <thead>
                <tr>
                    {headers.map((h, i) => <th key={i}>{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => renderRow(item, index))
                ) : (
                    <tr>
                        <td colSpan={headers.length} style={{ textAlign: 'center', padding: '2rem' }}>
                            No data available.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);
