import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const filters = useSelector(state => state.filters)
    const anecdotes = useSelector(state => state.anecdotes.filter(x => x.content.includes(filters.content)).sort((a, b) => b.votes - a.votes))

    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteOnAnecdote(id))

        const anecdote = anecdotes.find(x => x.id === id )

        dispatch(displayNotification(`You voted for anecdote ${anecdote.content}`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 2000)

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
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList