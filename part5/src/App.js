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

    const loggedUserJSON = window.localStorage.getItem('user')

    if(loggedUserJSON){

      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)

      blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )

    }

  }, [])


  const loginHandler = async (event) => {
    event.preventDefault()

    try {

      const user =  await loginService.login(credentials)
      setUser(user)
      blogService.setToken(user.token)
      setCredentials({ username: '', password: '' })

      const blogs = await blogService.getAll()
      setBlogs(blogs)

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

  const setUserNull = () => {
    window.localStorage.clear()
    setUser(null)
  }


  return (
    <div>

      {errorMessage &&  <Notification text={errorMessage} />}

      {user === null
        ? <LoginForm userCreds={credentials} logHandler={loginHandler} credHandler={credentialHandler} /> 
        : <BlogList blogs={blogs} username={user.name} userHandler={setUserNull} blogHandler={setBlogs}/>}

    </div>
  )
}

export default App