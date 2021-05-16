//libraries
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//reducers
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
//components
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import { Container } from 'react-bootstrap'

const App = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {

        const loggedUserJSON = window.localStorage.getItem('user')
      
        if(loggedUserJSON){
            const userFromStorage = JSON.parse(loggedUserJSON)
            dispatch(setUser(userFromStorage))
        }
                
    }, [dispatch])


    useEffect(() => {
        if(user.loggedUser)
            dispatch(initializeBlogs())
    }, [dispatch, user.loggedUser])


    return (
        <Container> 
           <Notification />
            {user.loggedUser === null
                  ? <LoginForm />
                  : <Menu />}
        </Container>
    )
}

export default App