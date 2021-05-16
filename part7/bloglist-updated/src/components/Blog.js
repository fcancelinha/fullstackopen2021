import React from 'react'
import { Link } from 'react-router-dom'


const Blog = ({blog, setDeletion}) => {


    return (
        <Link to={`/blogs/${blog.id}`} onClick={() => setDeletion(false)} className='blog'>
            <h3>{blog.title} - {blog.author} </h3>
        </Link>
    )
}

export default Blog