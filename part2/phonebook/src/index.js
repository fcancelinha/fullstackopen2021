import React, { useState } from 'react'
import ReactDOM from 'react-dom';



const PersonList = ({list}) => {

  console.log("personlist", list);

  return(
    <div>
      <ul>
        {list.map(({ id, name }) => 
          <li key={id}> {name} </li>
        )}
      </ul>

    </div>
  )
}



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')


  const handleNameInput = (event) => {
    console.log("name", event.target.value);
    setNewName(event.target.value);
  }

  const addName = (event) => {
    event.preventDefault();
    console.log("persons", persons);

    if(!newName){
      alert("you need to input a name")
      return
    }

    if(persons.findIndex(({name}) => name === newName) !== -1) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <PersonList list={persons} />


    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))