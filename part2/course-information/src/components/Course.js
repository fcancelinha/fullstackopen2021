import React from 'react'
import Content from './Content'
import Header from './Header'

const Course = ({course}) => {
    return (
        <div>
            <Header text={course.name} />
            
            <ul>
                <Content parts={course.parts} />
            </ul>
           
        </div>
    )
}

export default Course
