import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnedocte } from '../reducers/anecdoteReducer'
import { displayNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async(event) => {
        event.preventDefault()

        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createNewAnedocte(content))
        dispatch(displayNotification(`Anecdote ${content} created...`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 2000);
    }
  
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div>
                    <input name="anecdote"/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
