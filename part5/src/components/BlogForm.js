import React, {useState} from 'react'
import blogService from '../services/blogService'

const BlogForm = ({ currBlogs, notifiyHandler, blogHandler }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

    const addBlog = async (event) => {
        event.preventDefault()

        try {

            const response = await blogService.createBlog(newBlog)
            console.log(response)
            notifiyHandler({content: 'blog successfully added', color: 'green'})
            blogHandler(currBlogs.concat(response))

        }
        catch (error) {
            console.log(error)
            notifiyHandler({content: 'Error adding blog', color: 'red'})
        }


    }

    return (
        <form onSubmit={addBlog}>

            <h2>create new Blog</h2>

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

            <button type="submit" name="createBlogButton">Create</button>

        </form>
    )
}

export default BlogForm
