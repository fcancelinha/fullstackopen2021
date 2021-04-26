import axios from 'axios'


const login = async (credentials) => {

  const response = await axios.post('/api/login', { ...credentials })

  window.localStorage.setItem('user', JSON.stringify(response.data))

  return response.data
}



export default { login }

