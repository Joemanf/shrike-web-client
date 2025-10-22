import React from 'react';
import Select from 'react-select'

export default function NavBar({ theme, setTheme }) {

  const options = [
    { value: 'simple', label: 'Simple' },
    { value: 'aerieNights', label: 'Aerie Nights' },
    { value: 'agents', label: 'Agents of the Moon' },
    { value: 'keepers', label: 'Keepers of the Sun' },
    { value: 'sentinels', label: 'Sentinels' },
    { value: 'vipers', label: 'Vipers' },
    { value: 'purple', label: 'Purple' },
  ];

  const handleThemeChange = e => {
    setTheme(e.value);
  };

  return (
    <div id="navbar" style={{ borderBottom: '1px solid white' }} className='p-2 mb-8 flex justify-between'>
        <div className=''>
          <p>TotS</p>
        </div>
        <div className='flex'>
          {/* <a>Link 1</a> */}
          {/* <a>Link 2</a> */}
          {/* <a>Link 3</a> */}
          <div>
            <Select 
              id="themesDropdown" 
              value={theme} 
              onChange={handleThemeChange}
              className='mx-4'
              options={options}
            >
            </Select>
          </div>
          <div>Settings</div>
        </div>
        {/* <h1 className='text-center text-5xl pb-12'>Thorns of the Shrike</h1> */}
    </div>
  )
}