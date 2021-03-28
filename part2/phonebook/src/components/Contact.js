import React from 'react'


const Contact = ({ info }) => {

    return <>{info.name} | tel: {info.number}</>
}


export default Contact