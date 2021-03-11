import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './index.css';


const Header = ({ text }) => (
  <h2> {text} </h2>
)

const Statistic = ({ text, count, symbol }) => (
  <tr>
    <td>
      {text}
    </td>
    <td>
      <b>{count}</b> {symbol}
    </td>
  </tr>
)

const Statistics = (props) => {

  let { good, neutral, bad } = props.args

  let total = good + neutral + bad
  let positive = good ? (good / total) * 100 : 0
  let average = (good - bad) / total

  if (good || neutral || bad) {
    return (
      <table>
        <tbody>
          <Statistic text={"good"} count={good} />
          <Statistic text={"neutral"} count={neutral} />
          <Statistic text={"bad"} count={bad} />
          <Statistic text={"all: "} count={total} />
          <Statistic text={"average: "} count={average} />
          <Statistic text={"positive: "} count={positive} symbol={"%"} />
        </tbody> 
      </table>
    )

  }

  return <p> No feedback given </p>
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)


const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (

    <div id="main">

      <Header text={"give feedback"} />

      <div>
        <Button handleClick={increaseGood} text={"Good"} />
        <Button handleClick={increaseNeutral} text={"Neutral"} />
        <Button handleClick={increaseBad} text={"Bad"} />
      </div>

      <Header text={"statistics"} />

      <div>
        <Statistics args={{ good, neutral, bad }} />
      </div>

    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
);

