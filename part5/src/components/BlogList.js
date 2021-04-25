import React, { useState } from 'react'
import blogService from '../services/blogService'
import Blog from './Blog'


const BlogList = ({ blogs, username, userHandler, blogHandler, notifiyHandler }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })


    const addBlog = async (event) => {
        event.preventDefault()

        try {

            const response = await blogService.createBlog(newBlog)
            console.log(response)
            notifiyHandler({content: 'blog successfully added', color: 'green'})
            blogHandler(blogs.concat(response))

        }
        catch (error) {
            console.log(error)
            notifiyHandler({content: 'Error adding blog', color: 'red'})
        }


    }


    return (

        <div>


            <h1>blogs</h1>

            <div>

                <h2>{username} is logged in <button type="button" onClick={userHandler} >logout</button> </h2>

                <form onSubmit={addBlog}>

                    <h2>create new</h2>

                    <div>
                        title:<input type="text" value={newBlog.title} name="title" onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
                    </div>

                    <div>
                        author:<input type="text" value={newBlog.author} name="author" onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
                    </div>

                    <div>
                        url:<input type="text" value={newBlog.url} name="url" onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
                    </div>

                    <br></br>

                    <button type="submit" name="createBlogButton">create</button>

                </form>


                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}

            </div>


        </div>
    )
}

export default BlogList
