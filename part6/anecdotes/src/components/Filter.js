import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer'

const Filter = () => {

  const filter = useSelector(state => state.filters)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterAnecdote(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter.content} />
    </div>
  )
}

export default Filter