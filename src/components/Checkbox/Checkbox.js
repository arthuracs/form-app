import React from 'react'
import './checkbox.css'

export default function Checkbox({id, checked, onChange, children}){
    return (
        <div className="checkbox-container">
            <label htmlFor={id} className="checkbox">
                <input
                    name={id}
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange} 
                />
                <span class="checkmark"></span>
                {children}
            </label>
        </div>
    )
}