import React from 'react'
import Contact from './Contact'
import PhoneService from '../services/PhoneService'

const Contacts = ({ persons, filter, handler }) => {

    const deleteContact = (contactID, name) => {

        if (window.confirm(`Do you want to delete ${name} ?`)) {

            PhoneService
                .erase(contactID)
                .then(response => {
                
                    handler(contactID)

                }).catch(error => {
                    console.log("deletion error", error)
                    return alert("There was a problem deleting this contact, possibly deleted already")
                })
        }
    }


    return (
        <ul>
            {persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())).map(c =>
                <li key={c.id}>
                    <Contact info={c} /> <button onClick={() => deleteContact(c.id, c.name)}>delete</button>
                </li>
            )}
        </ul>
    )
}



export default Contacts