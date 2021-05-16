import React from 'react'
import { displayNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import CommentSection from './CommentSection'


const BlogDetail = ({onDelete}) => {

    const id = useParams().id
    const dispatch = useDispatch()
    
    const blog = useSelector(state => state.blog.find(x => x.id === id))
    const user = useSelector(state => state.user.allUsers.find(x => x.id === blog.user || blog.user.id))

    const delBlog = (blog) => {

        try {

            if (window.confirm(`Do you wish to remove ${blog.title} ?`)) {
                onDelete(true)
                dispatch(deleteBlog(blog.id))
                dispatch(displayNotification('Blog successfully deleted', 'green', 3000))
            }

        } catch (error) {
            console.log(error)
            dispatch(displayNotification('Error deleting blog', 'red', 3000))
        }
    }


    const likBlog = (blog) => {

        try {

            const newBlog = {
                ...blog,
                likes: blog.likes + 1
            }
            dispatch(likeBlog(newBlog))
        }
        catch (error) {
            console.log(error);
            dispatch(displayNotification('Couldn\'t like blog', 'red', 3000))
        }
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url} target="_blank" rel="noreferrer" className="blog-url"> {blog.url} </a>
            <div className="blog-likes">  {blog.likes} likes<button type="button" onClick={() => likBlog(blog)} className="like-blog">like</button></div>
            <button type="button" onClick={() => delBlog(blog)}>remove</button>
            <p>added by {user.name}</p>

            <CommentSection blog={blog} />

        </div>
    )
}

export default BlogDetail
