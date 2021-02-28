import React from 'react'
import ReactDOM from 'react-dom'


//Header, Content, Total

const Header = (props) => (  
  <h1> {props.course} </h1>
)


const Part = (props) =>  (
  <p>{props.title} <b>{props.number}</b></p>
)

const Content = (props) => {
  return(
  <div>
    <Part title={props.parts[0]} number={props.exercises[0]} />
    <Part title={props.parts[1]} number={props.exercises[1]} />
    <Part title={props.parts[2]} number={props.exercises[2]} />
  </div>
  )
}

/* {props.parts.map((ele, i) => {
  return <p> {ele} <b> - {props.exercises[i]} </b> </p>
})} */

const Total = (props) => (
  <p>Number of exercises <b> {props.total.reduce((x,y) => x + y)} </b></p>
)

const App = () => {
 
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  //I didn't want to change the structure
  const exercises = [exercises1, exercises2, exercises3]
  const parts = [part1, part2, part3]


  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total total={exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))