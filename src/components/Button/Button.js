import React from 'react'
import './button.css'

export default function Button({label, click, type = "secondary", size = "medium", disabled = false}) {
    return (
        <button
            className={`button button-${size} button-${type}`}
            onClick={click} 
            disabled={disabled}
        >
            {label}
        </button>
    )
}