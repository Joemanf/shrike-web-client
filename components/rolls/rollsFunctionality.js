import React from 'react';
import Select, { components } from 'react-select'
import '../../styles/base.css'
import SettingsIcon from '../../public/Setting.svg'
import AdvantageDropdown from './advantage';
import Image from "next/image";

export default function RollsFunctionality({ 
    theme, 
    handleRoll, 
    name, 
    handleName, 
    errors, 
    selectedStatus, 
    setSelectedStatus,
    numberOfDice,
    handleNumberOfDice,
    sides,
    handleSides,
    add,
    handleAdd,
  }) {

  return (
    <div id="rollsFunctionality" className='flex flex-col mt-8 mx-8 w-3/12'>
      <div className='flex items-center mb-6'>
        <p className='w-52'>Display Name</p>
        <div id="nameContainer" className='flex items-center' style={{ width: '465px' }}>
          <input 
            id='' 
            value={name} 
            placeholder='Name'
            onChange={handleName} 
            className={`bg-transparent rounded mx-2 px-2 py-1 input-${theme.value}`}
            style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary, placeholder: theme.secondary}}
          />
          {/* <button onClick={handleFilterOpen} className='mx-2 px-2 py-1 border' style={{border: `2px solid ${theme.tertiary}`}}>
            <Image 
              src="/filter-white.png"
              width={25} 
              height={25} 
            />
          </button> */}
          <div>
            {errors.length ? errors.map(error => (
                  <p key={error} className='text-red-500'>{error}</p>
                )
              ) : <></>
            }
          </div>
        </div>
      </div>
      <div>
        <p className='underline w-32'>Rolls:</p>
        <div className='flex items-center my-5'>
          <p className='w-32 mr-2'>Adv/Dis?</p>
          <AdvantageDropdown
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            theme={theme}
          />
        </div>
        <div className='flex items-center my-5'>
          <p className='w-32'>Roll #</p>
            <input 
              id='numberOfDice' 
              type='number' 
              min={1}
              max={100}
              value={numberOfDice} 
              onChange={handleNumberOfDice} 
              className='bg-transparent border mx-2 px-2 py-1 rounded'
              style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}
            />
        </div>
        <div className='flex items-center my-5'>
          <p className='w-28'>Dice</p>
          <div className='flex ml-2 items-center'>
            <p>d</p>
            <input 
              id='sides' 
              type='number' 
              min={1}
              max={100}
              value={sides} 
              onChange={handleSides} 
              className='bg-transparent border mx-2 px-2 py-1 rounded'
              style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}
            />
          </div>
        </div>
        <div className='flex items-center my-5'>
          <p className='w-32'>Modifier</p>
          <input 
              id='add' 
              type='number' 
              min={-1000}
              max={1000}
              value={add} 
              onChange={handleAdd} 
              className='bg-transparent border mx-2 px-2 py-1 rounded'
              style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}
            />
        </div>
      </div>
      <div className='flex justify-between my-5'>
        <div className='flex flex-col items-center cursor-pointer'>
          <Image 
            src="/Dice.svg"
            alt="Dice"
            width={40}
            height={40}
            onClick={handleRoll}
          />
          <p>Roll</p>
        </div>
        <div className='flex flex-col items-center cursor-pointer'>
          {/* <Image 
            src="/Calculator.svg"
            alt="Calculator"
            width={30}
            height={30}
            onClick={() => null}
          />
          <p>Bene Calculator</p> */}
        </div>
      </div>
    </div>
  )
}