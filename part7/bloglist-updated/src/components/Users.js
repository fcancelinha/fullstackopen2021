import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Users = () => {

    const users = useSelector(state => state.user.allUsers)

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>
                            <b>Blogs Created</b>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </td>
                                
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users
