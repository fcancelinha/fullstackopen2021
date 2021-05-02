import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const filters = useSelector(state => state.filters)
    const anecdotes = useSelector(state => state.anecdotes.filter(x => x.content.includes(filters.content)).sort((a, b) => b.votes - a.votes))

    const dispatch = useDispatch()

    const vote = (theAnecdote) => {
        console.log("theAnecdote", theAnecdote)
        theAnecdote.votes += 1
        dispatch(voteOnAnecdote(theAnecdote))

        const anecdote = anecdotes.find(x => x.id === theAnecdote.id )

        dispatch(displayNotification(`You voted for anecdote "${anecdote.content}"`, 3000))
    }

    return (
        <div>
            {anecdotes
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList