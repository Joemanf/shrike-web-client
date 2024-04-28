import React, { useRef } from 'react';

export default function RollsList({ rolls, loadMoreRolls, name }) {
  const rollsListRef = useRef(null);

  return (
    <div id="rollsList" ref={rollsListRef} className='border overflow-auto' style={{ height: '40vh' }}>
      {rolls && Object.values(rolls).length ? Object.values(rolls).map((roll) => (
        <div key={`${roll.data.time}${roll.data.name}`} className='flex border p-1 items-center'>
          <p className='min-w-fit'>{roll.data.time}</p>
          <p className='pl-2 border-l mx-2 min-h-full'>
            <span className={name === roll.data.name ? 'text-blue-300' : ''} >{roll.data.name}</span> rolled: {roll.data.logic}. Results: <span>{roll.data.result}</span> <span className='font-bold'>Total:</span> <span className={(roll.data.logic.split(' ')[0].trim() === '1d20' || roll.data.logic.split(' ')[0].trim() === 'd20') && parseInt(roll.data.total) >= 20 ? 'text-blue-300' : ''}>{roll.data.total}</span>
          </p>
        </div>
      )) : <></>}
      <div className='flex border p-1 items-center justify-center'>
        <button onClick={loadMoreRolls}>Load More</button>
      </div>
    </div>
  )
}