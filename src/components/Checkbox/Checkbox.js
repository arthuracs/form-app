import React from 'react'
import Label from '../Label/Label'
import './checkbox.css'

export default function Checkbox({id, checked, onChange, children}){
    return (
        <div className="checkbox-container">
            <Label forId={id} classes="checkbox">
                <input
                    name={id}
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange} 
                />
                <span className="checkmark"></span>
                {children}
            </Label>
        </div>
    )
}