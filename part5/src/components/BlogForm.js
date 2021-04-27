import React from 'react'

const BlogForm = ({ newBlog, blogHandler, setNewBlog }) => {


    return (
        <form onSubmit={blogHandler} className="blog-form">

            <h2>create new Blog</h2>

            <div>
                title:<input className="blog-title" type="text" value={newBlog.title} name="title" onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
            </div>

            <div>
                author:<input className="blog-author" type="text" value={newBlog.author} name="author" onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
            </div>

            <div>
                url:<input className="blog-url" type="text" value={newBlog.url} name="url" onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
            </div>

            <br></br>

            <button type="submit" name="createBlogButton" id="submit-blog">Create</button>

        </form>
    )
}

export default BlogForm
