import axios from 'axios'


const login = async (credentials) => {

    console.log("credentials", {...credentials})

    const response = await axios.post('/api/login', {...credentials})
    return response.data
}
  


export default {login}

  