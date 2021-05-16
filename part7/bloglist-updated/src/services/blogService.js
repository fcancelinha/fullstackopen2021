import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let config = null

const setToken = (userToken) => {

    config = { headers: { Authorization: `bearer ${userToken}` } }
}

const getAll = async() => {

    const request = await axios.get(baseUrl, config)
    return request.data
}

const createBlog = async (blog) => {

    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const updateBlog = async (blog) => {

    const newBlog = { ...blog }

    const response = await axios.put(`${baseUrl}/${blog.id}`, { ...newBlog }, config)
    return response.data
}

const deleteBlog = async (blogID) => {
    const response = await axios.delete(`${baseUrl}/${blogID}`, config)
    return response.data
}


export default {
    getAll,
    setToken ,
    createBlog,
    updateBlog,
    deleteBlog
}