import React from 'react'
import ReactDOM from 'react-dom'


//Header, Content, Total

const Header = (props) => (
  <h1> {props.course.name} </h1>
)


const Part = (props) => (
  <p>{props.title} <b>{props.number}</b></p>
)

const Content = (props) => {
  return (
    <div>
      <Part title={props.course.parts[0].name} number={props.course.parts[0].exercises} />
      <Part title={props.course.parts[1].name} number={props.course.parts[1].exercises} />
      <Part title={props.course.parts[2].name} number={props.course.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => (
  <p>Number of exercises <b> {props.course.parts.reduce((( x, y ) => x + y.exercises), 0)} </b></p>
)

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))