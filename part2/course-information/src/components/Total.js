import React from 'react'

const Total = ({parts}) => {
    return (
        <p><b> Total of {parts.reduce((( x, y ) => x + y.exercises), 0)} exercises </b></p>
    )
}

export default Total
