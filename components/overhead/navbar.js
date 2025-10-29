import React from 'react';
import Image from "next/image";
import Select, { components } from 'react-select'
import '../../styles/base.css'
import PaletteIcon from '../../public/Palette-2.svg'
import SettingsIcon from '../../public/Setting.svg'

export default function NavBar({ theme, setTheme }) {

  const options = [
    { value: 'simple', label: 'Simple', primary: '#161616', secondary: '#4F4F4F', tertiary: '#FFFFFF', backgroundImage: null, },
    { value: 'aerieNights', label: 'Aerie Nights', primary: '#000000', secondary: '#162347', tertiary: '#FFFFFF', backgroundImage: '/lighthouseblurred_1.png', },
    { value: 'agents', label: 'Agents of the Moon', primary: '#321010', secondary: '#612121', tertiary: '#85BBEE', backgroundImage: null, },
    { value: 'keepers', label: 'Keepers of the Sun', primary: '#6C0B0B', secondary: '#A05200', tertiary: '#F7FFAC', backgroundImage: null, },
    { value: 'sentinels', label: 'Sentinels', primary: '#1C0F52', secondary: '#5A5F82', tertiary: '#F3FBFF', backgroundImage: null, },
    { value: 'vipers', label: 'Vipers', primary: '#2B3F2C', secondary: '#311D1D', tertiary: '#83FF7F', backgroundImage: null, },
    { value: 'purple', label: 'Purple', primary: '#3B2452', secondary: '#846F94', tertiary: '#FFFFFF', backgroundImage: null, },
  ];

  const SingleValueWithIcon = (props) => (
    <components.SingleValue {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PaletteIcon 
          stroke={theme.tertiary}
          // fill={theme.tertiary}
          className="mr-2"
        />
        {/* <Image
          src="/Palette.svg"
          alt="Palette"
          className="dark:invert mr-2"
          width={22}
          height={15}
        /> */}
        {props.children}
      </div>
    </components.SingleValue>
  );

  const handleThemeChange = e => {
    setTheme(e);
    localStorage.setItem('userTheme', JSON.stringify(e));
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
      border: `2px solid ${theme.tertiary}`
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
    <div id="navbar" style={{ borderBottom: `2px solid ${theme.tertiary}` }} className='p-2 mb-8 flex justify-between'>
        <div className=''>
          <p>TotS</p>
        </div>
        <div className='flex items-center'>
          {/* <a>Link 1</a> */}
          {/* <a>Link 2</a> */}
          {/* <a>Link 3</a> */}
          <div>
            <Select 
              id="themesDropdown" 
              value={theme} 
              onChange={handleThemeChange}
              className={`mx-4 input-${theme.value}`}
              options={options}
              components={{
                SingleValue: SingleValueWithIcon
              }}
              styles={customStyles}
            >
            </Select>
          </div>
          <div>
            <SettingsIcon 
              style={{ width: '19px', height: '20px', }}
              stroke={theme.tertiary}
              fill={theme.tertiary}
              viewBox="0 0 19 20"
              className="mr-2"
            />
          </div>
        </div>
        {/* <h1 className='text-center text-5xl pb-12'>Thorns of the Shrike</h1> */}
    </div>
  )
}