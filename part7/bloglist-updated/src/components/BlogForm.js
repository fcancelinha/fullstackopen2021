import React from 'react'
import useField from '../hooks/useField'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {

    const dispatch = useDispatch()
    const loggedUser = useSelector(state => state.user.loggedUser)

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')


    const addBlog = (event) => {
        event.preventDefault()

        try {

            const newBlog = {
                title: title.value,
                author: author.value,
                url: url.value,
                user: loggedUser.id
            }
            
            dispatch(createBlog(newBlog))
            dispatch(displayNotification('Blog added successfully', 'green', 3000))

            title.onReset()
            author.onReset()
            url.onReset()
        }
        catch (error) {
            console.log(error)
            dispatch(displayNotification('Could not create blog, error', 'red', 3000))
        }

    }



    return (
        <Form onSubmit={addBlog} className="mt-3">
            <h4>Create Blog</h4>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control {...title} placeholder="Title" />
            </Form.Group>

            <Form.Group controlId="formBasicAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control {...author} placeholder="Author" />
            </Form.Group>

            <Form.Group controlId="formBasicUrl">
                <Form.Label>Url</Form.Label>
                <Form.Control {...url} placeholder="Url" />
            </Form.Group>

            <Button variant="primary" type="submit" block>
                Create
            </Button>
        </Form>
    )
}

export default BlogForm
