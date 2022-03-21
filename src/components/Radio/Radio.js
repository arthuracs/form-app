import React from 'react'
import Label from '../Label/Label'
import './radio.css'

export default function Radio({id, inputValue, onChange, options, children}){
    return (
        <div className="radio-group">
            <div className="radio-group-label">
                {children}
            </div>
            {options.map((option) => (
                <div className="radio-input" key={option}>
                    <input
                        name={id}
                        id={`petPref-${option}`}
                        type="radio"
                        value={option}
                        checked={inputValue === option}
                        onChange={onChange}
                    />
                    <Label forId={`petPref-${option}`} classes="radio-label">
                        {option}
                    </Label>
                </div>
            ))}
        </div>
    )
}