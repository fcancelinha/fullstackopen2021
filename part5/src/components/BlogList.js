import React from 'react'
import Blog from './Blog'
import Toggleable from '../components/Toggleable'
import BlogForm from './BlogForm'


const BlogList = ({ blogs, username, userHandler, blogHandler, notifiyHandler }) => {
   
    const setUserNull = () => {
        window.localStorage.clear()
        userHandler(null)
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
                    <Blog key={blog.id} blog={blog} /> 
                )}
            </div>
        </div>
    )
}

export default BlogList
