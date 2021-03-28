import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import PhoneService from './services/PhoneService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState("")
  
  const handlePerson = (entry) => setPersons(persons.concat(entry))


  useEffect(() => {
    PhoneService.getAll().then(data => {
      console.log("getAll", data);
      setPersons(data)
    })
  }, [])
  

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