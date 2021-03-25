import React, { useState } from 'react'
import ReactDOM from 'react-dom';



const Contact = ({ info }) => {

  return <li> {info.name} | tel: {info.number}</li>
}


const App = () => {
  const [persons, setPersons] = useState([
    { id: 12, name: 'Arto Hellas', number: '040-123456' },
    { id: 21, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 33, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 44, name: 'Mary Poppendieck', number: '39-23-6423122' }])
  const [newEntry, setNewEntry] = useState({ id: 0, name: '', number: 0 })
  const [filter, setFilter] = useState("")


  const handleInput = (key, e) => {

    setNewEntry({
      ...newEntry,
      [key]: e.target.value
    })

    console.log(newEntry);
  }



  const submitInput = (event) => {

    event.preventDefault();

    if (!newEntry.name || !newEntry.number)
      return alert("there are fields left blank")

    for (const ele of persons) {
      if (ele.name === newEntry.name)
        return alert(`${ele.name} already exist in the phonebook`)

      if (ele.number === newEntry.number)
        return alert(`${ele.number} already exist in the phonebook`)
    }

    newEntry.id = persons.length + 1
    setPersons(persons.concat(newEntry))
    setNewEntry({ id: 0, name: '', number: 0 })
  }


  return (
    <div>

      <h2>Phonebook</h2>

      <div> filter shown with: <input value={filter} onChange={(event) => setFilter(event.target.value)} /> </div>

      <h2>add a new</h2>

      <form>

        <div> name: <input value={newEntry.name} onChange={(event) => handleInput('name', event)} /></div>
        <div> number: <input value={newEntry.number || ''} onChange={(event) => handleInput('number', event)} /> </div>

        <div>
          <button type="submit" onClick={submitInput}>add</button>
        </div>

      </form>

      <h2>Numbers</h2>

      <ul>
        {persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())).map(c =>
          <Contact key={c.id} info={c} />
        )}
      </ul>


    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))