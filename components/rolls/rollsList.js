import React from 'react';

export default function RollsList({ rolls }) {
  console.log('rolls oh god', rolls)
  return (
    <div id="rollsList">
      {rolls && Object.values(rolls).length ? Object.values(rolls).map((roll) => (
        <div key={`${roll.time}${roll.name}`}>
          <p>{roll.time}</p>
          <p>
            {roll.name} rolled: {roll.logic}. Result: {roll.result}
          </p>
        </div>
      )) : <></>}
    </div>
  )
}