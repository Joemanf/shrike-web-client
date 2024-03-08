import React, { useEffect, useState } from 'react';
import AdvantageDropdown from '../components/rolls/advantage';
import RollsList from '@/components/rolls/rollsList';
import database from '@/firebase';
import { ref, onValue, child, push, update } from "firebase/database";
import '../app/globals.css'

export default function RollsHome() {
  const [selectedStatus, setSelectedStatus] = useState('normal');
  const [name, setName] = useState('')
  const [numberOfDice, setNumberOfDice] = useState(1)
  const [sides, setSides] = useState(20)
  const [add, setAdd] = useState(0)
  const [rolls, setRolls] = useState({})
  const [buttonDisabled, setButtonDisabled] = useState(false)

  useEffect(() => {
    const dbRef = ref(database, 'rolls');
    onValue(dbRef, snapshot => {
      const val = snapshot.val()
      const sortedVal = Object.values(val || {}).sort((a, b) => b.timestamp - a.timestamp);
      setRolls(sortedVal)
    }, error => {
      console.log('Error in onValue:', error)
    });
  }, []);

  const handleName = e => {
    setName(e.target.value);
  }

  const handleNumberOfDice = e => {
    setNumberOfDice(e.target.value);
  }

  const handleSides = e => {
    setSides(e.target.value);
  }

  const handleAdd = e => {
    setAdd(e.target.value);
  }

  const handleRoll = () => {
    if (buttonDisabled) {
      return
    }
    if (!name) {
      return console.log('Please enter a name')
    }
    let locRolls = []
    let rollsStr = ''
    // have to account for adv and dis
    if (selectedStatus === 'normal') {
      for (let i = 0; i < parseInt(numberOfDice); i++) {
          let roll = Math.floor(Math.random() * parseInt(sides)) + 1
          locRolls.push(roll + parseInt(add));
      }
    } else {
      for (let i = 0; i < parseInt(numberOfDice); i++) {
        const rollsTemp = []
        for (let j = 0; j < 2; j++) {
            rollsTemp.push(Math.floor(Math.random() * parseInt(sides)) + 1);
        }
        locRolls = [...locRolls, ...rollsTemp]
      }
    }
    const time = handleTime()
    const logic = `${selectedStatus === 'advantage' ? `[Adv] ` : `${selectedStatus === `disadvantage` ? `[Dis] ` : ``}`}${numberOfDice}d${sides}${add != 0 ? ` + ${add}` : ``}`
    let rollsTotal = [];
    locRolls.forEach((r, i) => {
      if (selectedStatus === 'normal') {
        rollsTotal.push(r)
        rollsStr += `${r-parseInt(add)}${add ? ` + ${add}` : ``}`
        if (i === rolls.length-1) {
            return
        } else {
            rollsStr += ', '
        }
      } else {
        rollsTotal.push(r + parseInt(add))
      }
    })
    const finalArr = []
    if (selectedStatus !== 'normal') {
      for (let i = 0; i < rollsTotal.length; i+=2) {
          const arr = [rollsTotal[i], rollsTotal[i+1]]
          rollsStr += `[${rollsTotal[i]-parseInt(add)}${add ?` + ${add}` : ``}, ${rollsTotal[i+1]-parseInt(add)}${add ?` + ${add}` : ``}]`
          if (i === rollsTotal.length-1 || i === rollsTotal.length-2) {
              // do nothing
          } else {
              rollsStr += ', '
          }
          let final
          if (selectedStatus === 'advantage') {
              final = Math.max(...arr)
          } else {
              final = Math.min(...arr)
          }
          finalArr.push(final)
      }
      rollsTotal = finalArr
    }
    rollsTotal = rollsTotal.join(', ')
    rollsStr = rollsStr.trim()
    const rollData = {
      time,
      name: name.trim(),
      logic,
      result: rollsStr,
      total: rollsTotal
    }
    // setRolls is a temporary fix.
    // Eventually, we'll want to send the data to the backend,
    // and from there pull the data via a subscription watcher/webhook
    // setRolls([rollData, ...rolls])
    sendToBackend(rollData)
    setButtonDisabled(true)
    setTimeout(() => {
      setButtonDisabled(false)
    }, 1000)
  }

  const sendToBackend = rollData => {
    // Get a key for a new Roll.
    const newRollKey = push(child(ref(database), 'rolls')).key;
    const currentTime = Date.now()

    // Write the new roll's data in the rolls list.
    const updates = {};
    updates['/rolls/' + newRollKey] = {data: rollData, timestamp: currentTime};

    return update(ref(database), updates);
  }

  const handleTime = () => {
    const utcDate = new Date()
    const estDate = new Date(utcDate.getTime() - 5 * 3600000)
    let hour = estDate.getHours()
    let minutes = estDate.getMinutes()
    let seconds = estDate.getSeconds()
    let month = estDate.getMonth()+1
    let day = estDate.getDate()
    let year = estDate.getFullYear()
    if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    if (month < 10) {
      month = `0${month}`
    }
    if (day < 10) {
      day = `0${day}`
    }
    return `${month}/${day}/${year}, ${hour}:${minutes}:${seconds}`
  }

  return (
    <main className="flex p-24">
      <div id="rollBox" className='flex flex-col w-full'>
        <div id="topBar" className='flex justify-between p-2 border'>
          <div id="nameContainer" className='flex items-center'>
            <p>Name:</p>
            <input 
              id='' 
              value={name} 
              onChange={handleName} 
              className='bg-transparent border mx-2 px-2 py-1'
            />
          </div>
          <div id="functionalityContainer" className='flex flex-row justify-between items-center'>
            <AdvantageDropdown selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
            <p>Roll:</p>
            <input 
              id='numberOfDice' 
              type='number' 
              min={1}
              max={100}
              value={numberOfDice} 
              onChange={handleNumberOfDice} 
              className='bg-transparent border mx-2 px-2 py-1'
            />
            <p>d</p>
            <input 
              id='sides' 
              type='number' 
              min={1}
              max={100}
              value={sides} 
              onChange={handleSides} 
              className='bg-transparent border mx-2 px-2 py-1'
            />
            <p>+</p>
            <input 
              id='add' 
              type='number' 
              min={-1000}
              max={1000}
              value={add} 
              onChange={handleAdd} 
              className='bg-transparent border mx-2 px-2 py-1'
            />
            <button onClick={handleRoll} className='mx-2 px-4 py-1 border'>Roll</button>
          </div>
        </div>
        <div id="rolls">
          <RollsList rolls={rolls} />
        </div>
      </div>
    </main>
  );
}
