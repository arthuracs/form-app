import React from 'react'
import './input.css'

export default function Input({id, inputValue, onChange}) {
    return (
        <React.Fragment>
            <input
                className='input'
                name={id}
                id={id}
                type="text"
                value={inputValue}
                onChange={onChange} 
            />
        </React.Fragment>
    )
}