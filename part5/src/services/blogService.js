import axios from 'axios'
const baseUrl = '/api/blogs'

let config = null

const setToken = (userToken) => {
  const token = `bearer ${userToken}`;

  config = {headers: { Authorization: token}}

}


const getAll = (token) => {
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}



export default {getAll, setToken }