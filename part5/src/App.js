import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import loginService from './services/loginService'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {

    if(user){
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
   
  }, [user])


  const loginHandler = async (event) => {
    event.preventDefault()

    try {

      const user =  await loginService.login(credentials)
      blogService.setToken(user.token)
      setUser(user)
      setCredentials({ username: '', password: '' })

    } catch (error) {
      console.log(error)
      setErrorMessage('Username or password invalid')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const credentialHandler = (credentials) => {
    setCredentials(credentials)
  }


  return (
    <div>

      {errorMessage &&  <Notification text={errorMessage} />}

      {user === null 
        ? <LoginForm credentials={credentials} userCreds={credentials} logHandler={loginHandler} credHandler={credentialHandler} /> 
        : <BlogList blogs={blogs} username={user.name} />}

    </div>
  )
}

export default App