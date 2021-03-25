import React from 'react'


const Contact = ({ info }) => {

    return <li> {info.name} | tel: {info.number}</li>
}


export default Contact