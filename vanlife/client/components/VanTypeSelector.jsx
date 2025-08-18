import React, { useState } from 'react'
import './VanTypeSelector.css'

const types = ['simple','rugged','luxury']

export const VanTypeSelector = ({ selectedType, onChange, disabled }) => {
    return (
        <div className='van-type-select'>Select type
            {types.map(type => (
                <div
                    key={type}
                    className={`van-type ${type} ${selectedType === type ? 'active' : ''}`}
                    onClick={() => {
                        if(!disabled)
                            onChange(type)
                    }}
                >
                    {type}
                </div>
            ))}
        </div>
    )
}