import React from 'react'
import Blog from './Blog'
import Toggleable from '../components/Toggleable'
import BlogForm from './BlogForm'
import blogService from '../services/blogService'

const BlogList = ({ blogs, username, userHandler, blogHandler, notifiyHandler }) => {

    const setUserNull = () => {
        window.localStorage.clear()
        userHandler(null)
    }

    const deleteBlog = async (blog) => {

        if (window.confirm(`Do you wish to remove ${blog.title} ?`)) {
            try {
                await blogService.deleteBlog(blog.id)
                blogHandler(blogs.filter(({ id }) => id !== blog.id))
                notifiyHandler({ content: 'Blog deleted with success', color: 'green' })
            }
            catch (exception) {
                console.log(exception)
                notifiyHandler({ content: 'Error deleting Blog', color: 'red' })
            }
        }
    }


    const likeBlog = async (blog) => {

        try {

            const newBlog = {
                ...blog,
                likes: blog.likes + 1
            }

            await blogService.updateBlog(newBlog)

            blogHandler(blogs.map((blog => blog.id === newBlog.id ? newBlog : blog)))
            notifiyHandler({ content: 'Blog updated with success', color: 'green' })
        }
        catch (exception) {
            console.log(exception)
            notifiyHandler({ content: 'Error updating Blog', color: 'red' })
        }
    }

    return (

        <div>
            <h1>Blogs</h1>
            <div>
                <h2>{username} is logged in <button type="button" onClick={setUserNull} >logout</button> </h2>

                <Toggleable buttonLabel={'Create Blog'}>

                    <BlogForm currBlogs={blogs} blogHandler={blogHandler} notifiyHandler={notifiyHandler} />

                </Toggleable>

                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} notifiyHandler={notifiyHandler} handleLike={likeBlog} handleDelete={deleteBlog} />
                )}
            </div>
        </div>
    )
}

export default BlogList
