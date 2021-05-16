import React from 'react'
import { useDispatch} from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import useField from '../hooks/useField'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {

    const dispatch = useDispatch()
    const username = useField('text')
    const password = useField('password')

    const loginHandler = (event) => {
        event.preventDefault()

        dispatch(loginUser({ username: username.value, password: password.value }))
    }



    return (

        <Form onSubmit={loginHandler}>

            <h3>Login</h3>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control {...username} placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control {...password} placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>

        </Form>
    )
}

export default LoginForm
