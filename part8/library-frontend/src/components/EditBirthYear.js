import React from 'react'
import useField from '../hooks/useField'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries/mutations'
import { ALL_AUTHORS } from '../queries/queries'



const EditBirthYear = ({authors}) => {

    const authorName = useField('text')
    const authorBirth = useField('number')


    const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    })

    const editBirthYear = (event) => {
        event.preventDefault()

        let [ name, setBornTo ] = [ authorName.value, authorBirth.value ]
        setBornTo = parseInt(setBornTo)

        editAuthor({variables: {name, setBornTo }})

        authorName.onChange('reset')
        authorBirth.onChange('reset')
    }



    return (
        <div>
            <h2>Set Birthyear</h2>
            <form onSubmit={editBirthYear}>

                <label>
                    Pick the Author:
                    <select {...authorName}>
                    {
                        authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)
                    }
                    </select>
                </label>

                <div>
                    birtyear: <input {...authorBirth} />
                </div>

                <button type="submit">update author</button>

            </form>

        </div>
    )
}

export default EditBirthYear
