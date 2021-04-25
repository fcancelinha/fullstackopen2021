import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
        <div> likes {blog.likes} </div>
        <div> {blog.author} </div>
      </div>

    </div>
  )
}

export default Blog