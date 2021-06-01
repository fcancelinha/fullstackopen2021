import React from 'react'
import { CoursePart } from '../models/CoursePart'

const Total = (props: {content: CoursePart[]}) => {
    return (
        <p>
           Number of exercises: {props.content.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )
}

export default Total
