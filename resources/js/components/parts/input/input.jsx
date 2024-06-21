import React from 'react';
import './style.scss';

export default function FormInput({ label = 'Enter Text', handleChange, required = false, ...otherProps }) {
    return (
        <div className="wrapper">
            <input onChange={handleChange} {...otherProps} className="input" required={required} placeholder={label} />
            <span className="underline"></span>
        </div>
    )
}
