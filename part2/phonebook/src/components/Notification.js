import React from 'react'

const Notification = ({content, color}) => {

    const notificationStyle =  {
        color: color,
        border: '20px solid',
        fontSize: 'x-large',
        borderWidth: 'thick',
        backgroundColor: color === 'transparent' ? color : 'antiquewhite',
        borderColor: color,
        padding: '5px'
    }

    return (
        <div style={notificationStyle}>
             {content}
        </div>
    )
}

export default Notification
