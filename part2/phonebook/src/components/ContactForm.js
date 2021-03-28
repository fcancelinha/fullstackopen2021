import React, { useState } from 'react'
import PhoneService from '../services/PhoneService'

const ContactForm = ({ persons, personHandler, notificationHandler}) => {
    const [newEntry, setNewEntry] = useState({ name: '', number: 0 })

    const submitInput = (event, contact) => {

        event.preventDefault();

        if (!newEntry.name || !newEntry.number)
            return alert("there are fields left blank")

        for (const ele of persons) {

            if ((ele.name === newEntry.name || ele.number === newEntry.number)
                && window.confirm(`${ele.name} already contains the info you are trying to add, update contact?`)) {

                PhoneService
                    .update(ele.id, contact)
                    .then(data => {
                        console.log("data", data)
                        personHandler(persons.map((contact => contact.id === ele.id ? data : contact )))
                        setNewEntry({ name: '', number: 0 })
                        notificationHandler({
                            content:`${ele.name} updated`,
                            color: "green"
                        })
                    }).catch(error => {
                        console.log(error)
                        notificationHandler({
                            content:`There was a problem updating ${ele.name}`,
                            color: "red"
                        })
                    })

                return null;

            }
        }

        PhoneService
            .create(newEntry)
            .then(data => {
                console.log("data", data)
                personHandler(persons.concat(data))
                setNewEntry({ name: '', number: 0 })
                notificationHandler({
                    content:`${newEntry.name} created successfully`,
                    color: "green"
                })
            }).catch(error => {
                console.log("create error", error)
                notificationHandler({
                    content:`There was a problem creating ${newEntry.name} contact`,
                    color: "red"
                })
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
                <button type="submit" onClick={(event) => submitInput(event, newEntry)}>
                    add
                </button>
            </div>

        </form>
    )


}

export default ContactForm