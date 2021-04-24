import React from 'react'
import Blog from './Blog'


const BlogList = ({blogs, username}) => {
    return (
        <div>

            <h2>{username} is logged in </h2>

            <h2>blogs</h2>

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}

        </div>

    )
}

export default BlogList
