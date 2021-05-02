export const voteOnAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const createNewAnedocte = (anecdote) => {
  return {
    type: 'CREATE',
    data: {
      ...anecdote
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes,
  }
}


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  const type = action.type

  switch(type){
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