import React from 'react';
import Image from "next/image";
import Select, { components } from 'react-select'

export default function NavBar({ theme, setTheme }) {

  const options = [
    { value: 'simple', label: 'Simple', primary: '#161616', secondary: '#4F4F4F', tertiary: '#FFFFFF' },
    { value: 'aerieNights', label: 'Aerie Nights', primary: '#000000', secondary: '#162347', tertiary: '#FFFFFF' },
    { value: 'agents', label: 'Agents of the Moon', primary: '#321010', secondary: '#612121', tertiary: '#85BBEE' },
    { value: 'keepers', label: 'Keepers of the Sun', primary: '#6C0B0B', secondary: '#A05200', tertiary: '#F7FFAC' },
    { value: 'sentinels', label: 'Sentinels', primary: '#1C0F52', secondary: '#5A5F82', tertiary: '#F3FBFF' },
    { value: 'vipers', label: 'Vipers', primary: '#2B3F2C', secondary: '#311D1D', tertiary: '#83FF7F' },
    { value: 'purple', label: 'Purple', primary: '#3B2452', secondary: '#846F94', tertiary: '#FFFFFF' },
  ];

  const SingleValueWithIcon = (props) => (
    <components.SingleValue {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <PaletteIcon /> */}
        <Image
          src="/Palette.svg"
          alt="Palette"
          className="dark:invert mr-2"
          width={22}
          height={15}
        />
        {props.children}
      </div>
    </components.SingleValue>
  );

  const handleThemeChange = e => {
    setTheme(e);
    localStorage.setItem('userTheme', JSON.stringify(e));
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
              components={{
                SingleValue: SingleValueWithIcon
              }}
              classNames={{
                control: () => 'bg-gray-500 text-white',
                option: () => 'bg-gray-400 text-white',
                menu: () => 'bg-gray-500 text-white'
              }}
            >
            </Select>
          </div>
          <div>Settings</div>
        </div>
        {/* <h1 className='text-center text-5xl pb-12'>Thorns of the Shrike</h1> */}
    </div>
  )
}