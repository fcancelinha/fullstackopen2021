import React from 'react'
import Blog from './Blog'
import Toggleable from '../components/Toggleable'
import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'
import { Button, ListGroup } from 'react-bootstrap'


const BlogList = ({setDeletion}) => {

    const blogs = useSelector(state => state.blog)

    return (

        <div>
            <div>
                <Toggleable buttonLabel={'Create Blog'}>

                    <BlogForm />

                </Toggleable>


                <ListGroup variant="flush" className="mt-5">
                    {blogs.map(blog =>
                    <ListGroup.Item key={blog.id} >
                        <Blog setDeletion={setDeletion} blog={blog} />
                    </ListGroup.Item>
                        
                    )}
                </ListGroup>

              
            </div>
        </div>
    )
}

export default BlogList
