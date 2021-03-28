import React from 'react'
import Contact from './Contact'
import PhoneService from '../services/PhoneService'

const Contacts = ({ persons, filter, handler, notificationHandler }) => {

    const deleteContact = (contactID, name) => {

        if (window.confirm(`Do you want to delete ${name} ?`)) {

            PhoneService
                .erase(contactID)
                .then(response => {
                    console.log(response)
                    handler(contactID)
                    notificationHandler({
                        content:`${name} deleted`,
                        color: "green"
                    })
                }).catch(error => {
                    console.log("deletion error", error)
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