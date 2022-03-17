import React from 'react'
import './button.css'

export default function Button({label, click, disabled}) {
    return (
        <button
            className="button" 
            onClick={click} 
            disabled={disabled}
        >
            {label}
        </button>
    )
}