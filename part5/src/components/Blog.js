import React, { useState } from 'react'


const Blog = ({ blog , handleLike, handleDelete}) => {
  const [visible, setVisible] = useState(false)


  const blogStyle = {
    padding: '5px',
    border: 'solid',
    borderWidth: 2,
    width: '20%',
    marginBottom: '5px'
  }

  const hideWhenVisible = { display: visible ? '' : 'none' }


  return (
    <div style={blogStyle}>
      <div>{blog.title} <button type="button" onClick={() => setVisible(!visible)}>  {visible ? 'hide' : 'view'} </button> </div>

      <div style={hideWhenVisible}>
        <div> {blog.url} </div>
        <div> likes {blog.likes} <button type="button" onClick={() => handleLike(blog)}>like</button></div>
        <div> {blog.author} </div>
        <button type="button" onClick={() => handleDelete(blog)}>remove</button>
      </div>

    </div>
  )
}

export default Blog