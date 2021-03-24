import React, { useState } from 'react'
import ReactDOM from 'react-dom';



const PersonList = ({list}) => {

  console.log("personlist", list);

  return(
    <div>
      <ul>
        {list.map(({ id, name, number}) =>
          <li key={id}> {name} | tel: {number}</li>
        )}
      </ul>

    </div>
  )
}



const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newEntry, setNewEntry ] = useState({id: 0, name: '', number: 0})


  const handleInput = (key, e) => {

    setNewEntry({
      ...newEntry,
      [key]: e.target.value
    })

    console.log(newEntry);
  }

  const submitInput = (event) => {
    
    event.preventDefault();

    if(!newEntry.name || !newEntry.number)
      return alert("there are fields left blank")

    for (const ele of persons) {
      if(ele.name === newEntry.name)
        return alert(`${ele.name} already exist in the phonebook`)

      if(ele.number === newEntry.number)
        return alert(`${ele.number} already exist in the phonebook`)
    }

    newEntry.id = persons.length + 1
    setPersons(persons.concat(newEntry))
    setNewEntry({id: 0, name: '', number: 0})
  }



  return (
    <div>

      <h2>Phonebook</h2>

      <form>

        <div> name: <input value={newEntry.name} onChange={(event) => handleInput('name', event)}/></div>
        <div> number: <input value={newEntry.number || ''} onChange={(event) => handleInput('number', event)}/> </div>
       
        <div>
          <button type="submit" onClick={submitInput}>add</button>
        </div>

      </form>

      <h2>Numbers</h2>

      <PersonList list={persons} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))