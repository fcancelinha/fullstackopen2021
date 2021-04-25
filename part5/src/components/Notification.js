import React from 'react'

const Notification = ({text, color}) => {

    const notificationStyle =  {
        color,
        border: '20px solid',
        fontSize: 'x-large',
        borderWidth: 'thick',
        backgroundColor: color === 'transparent' ? color : 'antiquewhite',
        borderColor: color,
        padding: '5px'
    }

    return (
        <div style={notificationStyle}>
             {text}
        </div>
    )
}

export default Notification
