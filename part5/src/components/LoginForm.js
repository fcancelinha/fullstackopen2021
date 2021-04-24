import React from 'react'

const LoginForm = ({ userCreds, logHandler, credHandler }) => {
    return (

        <div>
            <h3>Login</h3>

            <form onSubmit={logHandler}>

                <div>
                <h4>Username</h4>
                <input type="text" value={userCreds.username} name="Username" onChange={({ target }) => credHandler({ ...userCreds, username: target.value })} />
                </div>

                <div>
                <h4>Password</h4>
                <input type="password" value={userCreds.password} name="Password" onChange={({ target }) => credHandler({ ...userCreds, password: target.value })} />
                </div>

                <br></br>
                <button type="submit">Submit</button>

            </form>
        </div>
    )
}

export default LoginForm
