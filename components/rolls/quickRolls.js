import React from 'react';
import '../../styles/base.css'

export default function QuickRolls({ theme, handleRoll }) {

  return (
    <div id="quickRolls" className='w-24 flex flex-col items-center'>
      <div className='flex items-center w-24 rounded-tr' style={{border: `2px solid ${theme.tertiary}`, borderBottom: `2px solid ${theme.tertiary}`}}>
        <p className='w-24 p-1 min-h-full text-center'>Quick Roll</p>
      </div>
      <div id='quick-buttons' className='flex flex-col items-center w-24 rounded-br' style={{ height: '45vh', overflow: 'auto', border: `2px solid ${theme.tertiary}`, borderTop: `2px solid ${theme.tertiary}` }}>
        <button onClick={() => handleRoll(0)} className='w-8/12 mx-2 my-1 mt-2 px-4 py-1 rounded text-sm' style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}>+0</button>
        <button onClick={() => handleRoll(1)} className='w-8/12 mx-2 my-1 px-4 py-1 rounded text-sm' style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}>+1</button>
        <button onClick={() => handleRoll(2)} className='w-8/12 mx-2 my-1 px-4 py-1 rounded text-sm' style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}>+2</button>
        <button onClick={() => handleRoll(3)} className='w-8/12 mx-2 my-1 px-4 py-1 rounded text-sm' style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}>+3</button>
        <button onClick={() => handleRoll(4)} className='w-8/12 mx-2 my-1 px-4 py-1 rounded text-sm' style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}>+4</button>
        <button onClick={() => handleRoll(5)} className='w-8/12 mx-2 my-1 px-4 py-1 rounded text-sm' style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}>+5</button>
        <button onClick={() => handleRoll(6)} className='w-8/12 mx-2 my-1 px-4 py-1 rounded text-sm' style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}>+6</button>
        <button onClick={() => handleRoll(7)} className='w-8/12 mx-2 my-1 px-4 py-1 rounded text-sm' style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}>+7</button>
        <button onClick={() => handleRoll(8)} className='w-8/12 mx-2 my-1 px-4 py-1 rounded text-sm' style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}>+8</button>
        <button onClick={() => handleRoll(9)} className='w-8/12 mx-2 my-1 px-4 py-1 rounded text-sm' style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}>+9</button>
        {/* <button onClick={() => handleRoll(10)} className='w-8/12 mx-2 my-1 px-4 py-1 rounded text-sm' style={{border: `2px solid ${theme.tertiary}`, backgroundColor: theme.secondary}}>+10</button> */}
      </div>
    </div>
  )
}