import React, { useState, useEffect } from 'react'
import loginService from '../services/loginService'
import blogService from '../services/blogService'

const LoginForm = ({ setNotification, setUser, setBlogs }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [dismount, setDismount] = useState(true)

    useEffect(() => {
        return dismount
    }, [dismount])

    const loginHandler = async (event) => {
        event.preventDefault()
    
        try {
    
          const user =  await loginService.login(credentials)
          setUser(user)
          blogService.setToken(user.token)
          setCredentials({ username: '', password: '' })
    
          const blogs = await blogService.getAll()
          blogs.sort((a,b) => b.likes - a.likes)
          setBlogs(blogs)
            
        } catch (error) {
          console.log(error)
          setNotification({content:"'Username or password invalid'", color:"red"})
          setTimeout(() => {
            setNotification({content:"", color:"transparent"})
          }, 5000)
        } finally {
            setDismount(false)
        }
    
      }


    return (

        <div>
            <h3>Login</h3>

            <form onSubmit={loginHandler}>

                <div>
                <h4>Username</h4>
                <input type="text" value={credentials.username} name="Username" onChange={({ target }) => setCredentials({ ...credentials, username: target.value })} />
                </div>

                <div>
                <h4>Password</h4>
                <input type="password" value={credentials.password} name="Password" onChange={({ target }) => setCredentials({ ...credentials, password: target.value })} />
                </div>

                <br></br>
                <button type="submit">Submit</button>

            </form>
        </div>
    )
}

export default LoginForm
