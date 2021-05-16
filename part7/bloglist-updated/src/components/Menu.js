import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link, NavLink,  Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './BlogList'
import Users from './Users'
import { setUserNull } from '../reducers/userReducer'
import UserBlogs from './UserBlogs'
import BlogDetail from './BlogDetail'
import { Form, Button, Navbar, Nav } from 'react-bootstrap'

const Menu = () => {
    const [deletion, setDeletion] = useState(false)

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.loggedUser)



    return (

        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Blog App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span"><Link to="/" >Blogs</Link></Nav.Link>
                        <Nav.Link href="#" as="span"><Link to="/users" >Users</Link></Nav.Link>
                    </Nav>
                    <Form inline>
                        <Nav.Link href="#" as="span"><b>{user.name}</b> is logged in</Nav.Link>
                        <Button variant="outline-warning"  type="button" onClick={() => dispatch(setUserNull())}>Logout</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>


                <Switch>

                    <Route path="/users/:id">
                        <UserBlogs />
                    </Route>

                    <Route path="/users">
                        <Users />
                    </Route>

                    <Route path="/blogs/:id">
                        { deletion ? <Redirect to="/" /> : <BlogDetail onDelete={setDeletion}/> }
                    </Route>

                    <Route path="/blogs">
                        <BlogList setDeletion={setDeletion}  />
                    </Route>

                    <Route path="/">
                        <BlogList setDeletion={setDeletion} />
                    </Route>

                </Switch>

            </Router>
    )
}

export default Menu
