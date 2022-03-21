import React from 'react'
import './label.css'

export default function Label({forId, classes, children}) {
    return (
        <label htmlFor={forId} className={`input-label ${classes}`}>
            {children}
        </label>
    )
}