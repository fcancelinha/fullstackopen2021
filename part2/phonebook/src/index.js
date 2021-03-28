import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import PhoneService from './services/PhoneService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState({content:"", color:"transparent"})
  
  const handlePerson = (entry) => setPersons(entry)
  const handlePersonDeletion = (contactID) => setPersons(persons.filter(({id}) => id !== contactID))

  const handleNotification = (content) => {
    setNotification(content)

    setTimeout(() => {
      setNotification({content:"", color:"transparent"})
    }, 5000)
  }


  useEffect(() => {
    PhoneService.getAll().then(data => {
      console.log("getAll", data);
      setPersons(data)
    })
  }, [])
  

  return (
    <div>

      <Notification color={notification.color} content={notification.content} />

      <h2>Phonebook</h2>

      <Filter filter={filter} onChange={(event) => setFilter(event.target.value)}/>

      <h2>add a new</h2>

      <ContactForm persons={persons} personHandler={handlePerson} notificationHandler={handleNotification} />

      <h2>Numbers</h2>

      <Contacts persons={persons} filter={filter} handler={handlePersonDeletion} notificationHandler={handleNotification} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))