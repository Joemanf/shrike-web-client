import React from 'react';

const options = [
  { value: 'normal', label: 'Normal' },
  { value: 'advantage', label: 'Advantage' },
  { value: 'disadvantage', label: 'Disadvantage' },
];

export default function AdvantageDropdown({ selectedStatus, setSelectedStatus, theme }) {
  const handleStatusChange = e => {
    setSelectedStatus(e.target.value);
  };

  return (
    <select 
      id="advantageDropdown" 
      value={selectedStatus} 
      onChange={handleStatusChange}
      className='bg-transparent border mx-2 p-1 pl-2'
      style={{border: `1px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}
    >
      {options.map((option) => (
        <option 
          key={option.value} 
          value={option.value}
          className='text-black'
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}