import React from 'react'
import './select.css'

export default function Select({id, inputValue, onChange, options, placeholder = "Select an option..."}) {
    return (
        <React.Fragment>
            <select 
                name={id}
                id={id}
                value={inputValue}
                onChange={onChange} 
            >
                <option key="none" value="" disabled>{placeholder}</option>
                { options.map(({ key, value }) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>
        </React.Fragment>
    )
}