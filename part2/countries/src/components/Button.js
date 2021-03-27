import React from 'react'

const Button = ({handler, text}) => {
    return <button onClick={handler}> {text} </button>
}

export default Button
