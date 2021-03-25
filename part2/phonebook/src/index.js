import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'




const App = () => {
  const [persons, setPersons] = useState([
    { id: 12, name: 'Arto Hellas', number: '040-123456' },
    { id: 21, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 33, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 44, name: 'Mary Poppendieck', number: '39-23-6423122' }])
  const [filter, setFilter] = useState("")
  
  const handlePerson = (entry) => setPersons(persons.concat(entry))
  

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter filter={filter} onChange={(event) => setFilter(event.target.value)}/>

      <h2>add a new</h2>

      <ContactForm persons={persons} personHandler={handlePerson} />

      <h2>Numbers</h2>

      <Contacts persons={persons} filter={filter} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))