import anecdoteService from '../services/anecdoteService'

export const voteOnAnecdote = (id) => {

  return {
    type: 'VOTE',
    data: {
      id
    }
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
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE': {
       const id = action.data.id
       const anecdoteToUpdate = state.find(a => a.id === id)
       const newAnecdote = {
         ...anecdoteToUpdate,
         votes: anecdoteToUpdate.votes + 1
       } 
      return state.map(a => a.id !== id ? a : newAnecdote)
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