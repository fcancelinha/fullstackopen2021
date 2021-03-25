import React from 'react'
import Contact from './Contact'

const Contacts = ({persons, filter}) => {
    return (
        <ul>
            {persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())).map(c =>
                <Contact key={c.id} info={c} />
            )}
        </ul>
    )
}



export default Contacts