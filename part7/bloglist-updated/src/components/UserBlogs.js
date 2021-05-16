import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const UserBlogs = () => {
    
    const id = useParams().id
    const user = useSelector(state => state.user.allUsers.find(x => x.id === id))

    return (
        <div className="mt-5">

            <h4>Added blogs by user: <b>{ user.name }</b></h4>

            <ListGroup variant="flush" className="mt-3">
                {
                    user.blogs.length
                        ? user.blogs.map(blog => <ListGroup.Item key={blog.id}> {blog.title } </ListGroup.Item>)
                        : <p>This user has no blogs...</p>
                }

            </ListGroup>

        </div>
    );
}

export default UserBlogs
