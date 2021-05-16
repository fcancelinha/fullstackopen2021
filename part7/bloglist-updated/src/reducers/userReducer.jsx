import userService from "../services/userService"
import loginService from '../services/loginService'
import blogService from '../services/blogService'

export const loginUser = (credentials) => {
    return async dispatch => {
        
        const response = await loginService.login(credentials)
        const allUsers = await userService.get()
        const loggedUser = allUsers.find(user => user.username === response.username)

        blogService.setToken(response.token)
        
        dispatch({
            type: 'LOGIN',
            payload: {
                loggedUser,
                allUsers
            }
        })
    }
}

export const setUser = (user) => {
    return async dispatch => {

        blogService.setToken(user.token)
        const allUsers = await userService.get()
        const loggedUser = allUsers.find(x => x.username === user.username)

        dispatch ({
            type: 'SET',
            payload: {
                loggedUser,
                allUsers
            }
        })
    }
}

export const setUserNull = () => {
    return {
        type: 'RESET',
        payload: null
    }
}


const initialState = {loggedUser: null, allUsers: []}


const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'GET':{
            return { 
                ...state,
                loggedUser: payload.loggedUser,
                allUsers: payload.allUsers
                }
        }
        case 'LOGIN': {
            return { 
                ...state,
                loggedUser: payload.loggedUser,
                allUsers: payload.allUsers
            }
        }
        case 'SET': {
            return {  ...state,
                loggedUser: payload.loggedUser,
                allUsers: payload.allUsers
            }
        }
        case 'RESET': {
            window.localStorage.clear()
            return {
                ...state,
                loggedUser: null
            }
        }
        default:
            return state
    }
}


export default reducer




