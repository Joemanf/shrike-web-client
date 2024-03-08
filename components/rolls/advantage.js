import React from 'react';

const options = [
  { value: 'normal', label: 'Normal' },
  { value: 'advantage', label: 'Advantage' },
  { value: 'disadvantage', label: 'Disadvantage' },
];

export default function AdvantageDropdown({ selectedStatus, setSelectedStatus }) {
  const handleStatusChange = e => {
    setSelectedStatus(e.target.value);
  };

  return (
    <select id="advantageDropdown" value={selectedStatus} onChange={handleStatusChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}