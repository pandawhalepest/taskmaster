import React from 'react';
import { useState } from 'react';

export default function Dropdown({ options }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    return (
        <div>
            <label htmlFor="groupDropdown">Select a Group Task</label>
            <select id="groupDropdown" value={selectedValue} onChange={handleChange} onClick={e => e.stopPropagation()}>
                <option value="">-- Please choose an option --</option>
                {options.map(option => (
                    <option key={option.title} value={option.title}>
                        {option.title}
                    </option>
                ))}
            </select>
            {selectedValue && <p>You selected: {selectedValue}</p>}
        </div>
    )
}