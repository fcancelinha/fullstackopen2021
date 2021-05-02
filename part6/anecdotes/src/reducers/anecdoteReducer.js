import anecdoteService from '../services/anecdoteService'

export const voteOnAnecdote = (anecdote) => {

  return async dispatch => {
    await anecdoteService.updateAnecdote(anecdote.id, anecdote)
    dispatch({
      type: 'VOTE',
      data: anecdote.id,
    })
  }
}

export const createNewAnedocte = (anecdote) => {

  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew({content: anecdote, votes: 0})
    dispatch({
      type: 'CREATE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {

  return async dispatch =>  {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}


const reducer = (state = [], action) => {

  switch(action.type){
    case 'VOTE': {
      return [...state]
    }
    case 'CREATE': {
      return [...state, action.data]
    }
    case 'INIT': {
      return action.data
    }
    default:
      return state
  }

}

export default reducer