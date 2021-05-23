  
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/queries'
import EditBirthYear from './EditBirthYear'

const Authors = () => {
  
  const result = useQuery(ALL_AUTHORS)
  
  if(result.loading){
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody> 
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

            <EditBirthYear authors={authors} />

    </div>
  )
}

export default Authors
