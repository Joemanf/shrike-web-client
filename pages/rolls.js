import React, { useEffect, useState } from 'react';
import AdvantageDropdown from '../components/rolls/advantage';
import RollsList from '@/components/rolls/rollsList';
import Header from '@/components/overhead/header';
import database from '@/firebase';
import { ref, onValue, get, child, push, update, query, orderByChild, limitToLast, limitToFirst, startAt, enableLogging } from "firebase/database";
import '../app/globals.css'
import Image from 'next/image'

export default function RollsHome() {
  const [selectedStatus, setSelectedStatus] = useState('normal');
  const [name, setName] = useState('')
  const [filter, setFilter] = useState('')
  const [numberOfDice, setNumberOfDice] = useState(1)
  const [sides, setSides] = useState(20)
  const [add, setAdd] = useState(0)
  const [rolls, setRolls] = useState({})
  const [filteredRolls, setFilteredRolls] = useState({})
  const [lastKey, setLastKey] = useState('unused')
  const [loadThisMany, setLoadThisMany] = useState(100)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const dbRef = ref(database, 'rolls')
    let sortedAndLimitedRef 
    if (lastKey === 'unused') {
      sortedAndLimitedRef = query(dbRef, limitToFirst(50));
    } else {
      sortedAndLimitedRef = query(dbRef, startAt(lastKey), limitToFirst(50))
    }
    onValue(sortedAndLimitedRef, snapshot => {
      const val = snapshot.val()
      setRolls({...val, ...rolls,})
      filterRolls({...val, ...rolls,})
      const lastRetrievedKey = snapshot.val() ? Object.keys(snapshot.val()).pop() : null;
      setLastKey(lastRetrievedKey)
    }, error => {
      console.log('Error in onValue:', error)
    });
  }, []);

  useEffect(() => {
    setFilteredRolls(rolls)
    filterRolls(rolls)
  }, [filter])

  const handleFilter = e => {
    setFilter(e.target.value);
  }

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
    setAdd(parseInt(e.target.value));
  }

  const filterRolls = (rollsLoc) => {
    const rollsTemp = {...rollsLoc}
    if (filter.length) {
      for (let key in rollsTemp) {
        if (!rollsTemp[key].data.name.toLowerCase().includes(filter.toLowerCase())) {
          delete rollsTemp[key]
        }
      }
    }
    setFilteredRolls(rollsTemp)
  }

  const handleRoll = (num) => {
    if (buttonDisabled) {
      return
    }
    setErrors([])
    if (!name) {
      setErrors(['Please enter a name'])
      return console.log('Please enter a name')
    }
    let locAdd
    if ((Number(num) || Number(num) === 0) && Number(num) !== NaN) {
      locAdd = parseInt(num)
    } else {
      locAdd = add
    }
    let locRolls = []
    let rollsStr = ''
    if (selectedStatus === 'normal') {
      for (let i = 0; i < parseInt(numberOfDice); i++) {
          let roll = Math.floor(Math.random() * parseInt(sides)) + 1
          locRolls.push(roll + parseInt(locAdd));
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
    const logic = `${selectedStatus === 'advantage' ? `[Adv] ` : `${selectedStatus === `disadvantage` ? `[Dis] ` : ``}`}${numberOfDice}d${sides}${locAdd != 0 ? ` + ${locAdd}` : ``}`
    let rollsTotal = [];
    locRolls.forEach((r, i) => {
      if (selectedStatus === 'normal') {
        rollsTotal.push(r)
        rollsStr += `${r-parseInt(locAdd)}${locAdd ? ` + ${locAdd}` : ``}`
        if (i === rolls.length-1) {
            return
        } else {
            rollsStr += ', '
        }
      } else {
        rollsTotal.push(r + parseInt(locAdd))
      }
    })
    const finalArr = []
    if (selectedStatus !== 'normal') {
      for (let i = 0; i < rollsTotal.length; i+=2) {
          const arr = [rollsTotal[i], rollsTotal[i+1]]
          rollsStr += `[${rollsTotal[i]-parseInt(locAdd)}${locAdd ?` + ${locAdd}` : ``}, ${rollsTotal[i+1]-parseInt(locAdd)}${locAdd ?` + ${locAdd}` : ``}]`
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
    sendToBackend(rollData)
    setButtonDisabled(true)
    setSelectedStatus('normal')
    setTimeout(() => {
      setButtonDisabled(false)
    }, 1000)
  }

  const sendToBackend = rollData => {
    // Get a key for a new Roll.
    const newRollKey = push(child(ref(database), 'rolls')).key;
    const currentTime = Date.now() * -1

    // initial key is an extremely large number. 
    // This is a ticking time bomb that should explode in
    // about 9 million years, assuming a very active guild
    const biggestKey = Object.keys(rolls)[0].split('-')[0]
    const parsedKey = parseInt(biggestKey)
    const nextKey = parsedKey-1 
    const updates = {};
    updates['/rolls/' + `${nextKey}${newRollKey}`] = {data: rollData, timestamp: currentTime};
    return update(ref(database), updates);
  }

  const handleTime = () => {
    const utcDate = new Date()
    const estDate = new Date(utcDate.getTime() - 1 * 3600000)
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

  const handleQuick0 = () => {
    handleRoll(0)
  }

  const handleQuick2 = () => {
    handleRoll(2)
  }

  const handleQuick4 = () => {
    handleRoll(4)
  }

  const handleQuick6 = () => {
    handleRoll(6)
  }

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen)
  }

  const loadMoreRolls = async () => {
    let dbRef = ref(database, 'rolls')
    let sortedAndLimitedRef = query(dbRef, limitToFirst(loadThisMany));
    onValue(sortedAndLimitedRef, snapshot => {
      const val = snapshot.val()
      setRolls({...val, ...rolls,})
      filterRolls({...val, ...rolls,})
      setLoadThisMany(loadThisMany+50)
    }, error => {
      console.log('Error in loadMoreRolls:', error)
    });
  }

  return (
    <main className="px-24 py-6">
      <Header />
        {
          filterOpen && 
          <div id='filterBar' className=''>
            <input 
              value={filter} 
              onChange={handleFilter} 
              placeholder='Filter'
              className='bg-transparent border px-2 py-1'
              style={{position: 'absolute', top: '47%', left: '15%'}}
            />
          </div>
        }
      <div id="rollBox" className='flex flex-col w-full'>
        <div id="topBar" className='flex justify-between p-2 border'>
          <div id="nameContainer" className='flex items-center' style={{ width: '465px' }}>
            {/* <p>Name:</p> */}
            <input 
              id='' 
              value={name} 
              placeholder='Name'
              onChange={handleName} 
              className='bg-transparent border mx-2 px-2 py-1'
            />
            <button onClick={handleFilterOpen} className='mx-2 px-2 py-1 border'>
              <Image 
                src="/filter-white.png"
                width={25} 
                height={25} 
              />
            </button>
            <div>
              {errors.length ? errors.map(error => (
                    <p key={error} className='text-red-500'>{error}</p>
                  )
                ) : <></>
              }
            </div>
          </div>
          <div id="functionalityContainer" className='flex flex-row justify-between items-center overflow-x-auto'>
            <button onClick={handleQuick0} className='mx-2 px-4 py-1 border'>+0</button>
            <button onClick={handleQuick2} className='mx-2 px-4 py-1 border'>+2</button>
            <button onClick={handleQuick4} className='mx-2 px-4 py-1 border'>+4</button>
            <button onClick={handleQuick6} className='mx-2 px-4 py-1 border'>+6</button>
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
          <RollsList 
            rolls={filteredRolls} 
            loadMoreRolls={loadMoreRolls} 
            name={name} 
          />
        </div>
      </div>
    </main>
  );
}
