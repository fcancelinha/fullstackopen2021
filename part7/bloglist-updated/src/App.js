import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {

    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState({ content:'', color:'transparent' })

    useEffect(() => {

        const loggedUserJSON = window.localStorage.getItem('user')

        if(loggedUserJSON){

            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            setUser(user)

            blogService
                .getAll()
                .then(blogs => {

                    blogs.sort((a,b) => b.likes - a.likes)
                    setBlogs(blogs)

                })

        }

    }, [])


    const handleNotification = (content) => {
        setNotification(content)

        setTimeout(() => {
            setNotification({ content:'', color:'transparent' })
        }, 5000)
    }


    return (
        <div>

            {notification.content && <Notification text={notification.content} color={notification.color} />}

            {user === null
                ? <LoginForm setUser={setUser} setBlogs={setBlogs} setNotification={setNotification} />
                : <BlogList blogs={blogs}
                    username={user.name}
                    userHandler={setUser}
                    blogHandler={setBlogs}
                    notifiyHandler={handleNotification}/>}

        </div>
    )
}

export default App