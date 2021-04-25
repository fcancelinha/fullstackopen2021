import axios from 'axios'
const baseUrl = '/api/blogs'


let config = null

const setToken = (userToken) => {

  config = {headers: {Authorization: `bearer ${userToken}`}}
}


const getAll = async() => {
  
  const request = await axios.get(baseUrl, config)
  return request.data
}

const createBlog = async (newBlog) => {

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}


export default {
  getAll, 
  setToken , 
  createBlog 
}