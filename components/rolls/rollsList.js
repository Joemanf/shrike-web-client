import React from 'react';

export default function RollsList({ rolls }) {
  return (
    <div id="rollsList" className='border'>
      {rolls && Object.values(rolls).length ? Object.values(rolls).map((roll) => (
        <div key={`${roll.data.time}${roll.data.name}`} className='flex border p-1 items-center'>
          <p className='min-w-fit'>{roll.data.time}</p>
          <p className='pl-2 border-l mx-2 min-h-full'>
            {roll.data.name} rolled: {roll.data.logic}. Result: <span className={roll.data.logic.split(' ')[0] === '1d20' && parseInt(roll.data.result) >= 20 ? 'text-blue-300' : ''}>{roll.data.result}</span>
          </p>
        </div>
      )) : <></>}
    </div>
  )
}