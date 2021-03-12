import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h2> {text} </h2>

const Button = ({handle, text}) => <button onClick={handle}> {text} </button>

const App = () => {

  const [selected, setSelected] = useState(0)
  const [topIndex, setTopIndex] = useState(0)
  const [votes, setVotes] = useState([])

  const randAnecdote = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length)))
    console.log(selected)
  } 

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const vote = () => {

    let copy = [...votes]

    if(!copy.length)
      copy = copy.concat(new Array(anecdotes.length).fill(0))

    copy[selected] += 1
    
    if(copy[selected] > copy[topIndex])
      setTopIndex(selected)
    
    setVotes(copy)
  }
   
 

  return (
    <div>

      <Header text={'Anecdote of the day'} />

      {anecdotes[selected]}
      <div>
        has {votes[selected] || 0} votes
      </div>
     
      <div>
        <Button handle={vote} text={'vote'} />
        <Button handle={randAnecdote} text={'next anecdote'} />
      </div>

      <Header text={'Anecdote with most votes'} />

      <div>
      {anecdotes[topIndex]}
        <div>
          has {votes[topIndex] || 0} votes 
        </div>
      </div>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))