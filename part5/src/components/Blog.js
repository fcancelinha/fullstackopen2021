import React, { useState } from 'react'

const Blog = ({ blog , handleLike, handleDelete }) => {
    const [visible, setVisible] = useState(false)


    const blogStyle = {
        padding: '5px',
        border: 'solid',
        borderWidth: 2,
        width: '20%',
        marginBottom: '5px',
        listStyle: 'none'
    }

    const hideWhenVisible = { display: visible ? '' : 'none' }


    return (
        <li style={blogStyle} className='blog'>
            <div>{blog.title} - {blog.author} <button type="button" onClick={() => setVisible(!visible)} className="toggle-view">  {visible ? 'hide' : 'view'} </button> </div>

            <div style={hideWhenVisible}>
                <div className="blog-url"> {blog.url} </div>
                <div className="blog-likes"> likes {blog.likes} <button type="button" onClick={() => handleLike(blog)} className="like-blog">like</button></div>
                <button type="button" onClick={() => handleDelete(blog)}>remove</button>
            </div>

        </li>
    )
}

export default Blog