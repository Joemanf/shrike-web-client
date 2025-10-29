import React from 'react';
import Select, { components } from 'react-select'


export default function AdvantageDropdown({ selectedStatus, setSelectedStatus, theme }) {
  const options = [
    { value: 'normal', label: 'Normal' },
    { value: 'advantage', label: 'Advantage' },
    { value: 'disadvantage', label: 'Disadvantage' },
  ];
  
  const handleStatusChange = e => {
    setSelectedStatus(e);
  };

  const customStyles = {
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused 
        ? '#444444'  // When hovering/focused
        : state.isSelected 
          ? '#333333'  // When selected
          : theme.secondary,
      color: theme.tertiary,
      cursor: 'pointer',
      transition: 'background-color 0.1s ease'
    }),
    control: (base, state) => ({
      ...base,
      backgroundColor: theme.secondary,
      color: theme.tertiary,
      cursor: 'pointer',
    }),
    menu: (base, state) => ({
      ...base,
      backgroundColor: theme.secondary, 
      color: theme.tertiary,
      cursor: 'pointer',
    }),
    placeholder: (base, state) => ({
      ...base,
      backgroundColor: theme.secondary, 
      color: theme.tertiary,
      cursor: 'pointer',
    }),
    singleValue: (base, state) => ({
      ...base,
      backgroundColor: theme.secondary, 
      color: theme.tertiary,
      cursor: 'pointer',
    }),
  };

  return (
    <Select 
      id="advantageDropdown" 
      value={selectedStatus} 
      onChange={handleStatusChange}
      // className='bg-transparent border mx-2 p-1 pl-2'
      className={`input-${theme.value}`}
      options={options}
      // style={{border: `1px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}
      styles={customStyles}
    />
    // </Select>
  )
}