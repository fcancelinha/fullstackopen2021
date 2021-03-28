import React, { useState } from 'react'
import axios from 'axios'

const ContactForm = ({persons, personHandler}) => {
    const [newEntry, setNewEntry] = useState({name: '', number: 0 })

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

        axios
            .post(`http://localhost:3001/persons`, newEntry)
            .then(response => {
                console.log(response)
                personHandler(response.data)
                setNewEntry({name: '', number: 0})
            }).catch(error => {
                console.log(error)
            })

       
    }

    const handleInput = (key, e) => {

        setNewEntry({
            ...newEntry,
            [key]: e.target.value
        })

    }


    return (
        <form>

            <div>
                name: <input value={newEntry.name} onChange={(event) => handleInput('name', event)} />
            </div>
            <div>
                number: <input value={newEntry.number || ''} onChange={(event) => handleInput('number', event)} />
            </div>

            <div>
                <button type="submit" onClick={submitInput}>
                    add
                </button>
            </div>

        </form>
    )


}

export default ContactForm