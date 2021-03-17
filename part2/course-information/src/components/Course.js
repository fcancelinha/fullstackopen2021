import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ course }) => {

    return (
        <div>

            <Header text={'Web development curriculum'} />

            {course.map(c =>
            
                <div key={c.id}>
                    <Header text={c.name} />

                    <ul>
                        <Content parts={c.parts} />
                    </ul>

                    <Total parts={c.parts} />
                </div>
            )}

        </div>
    )
}

export default Course
