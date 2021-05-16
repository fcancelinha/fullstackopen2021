import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import userReducer from '../reducers/userReducer'
import thunkMiddleware from 'redux-thunk'


const reducer = combineReducers({
    blog: blogReducer,
    notification: notificationReducer,
    user: userReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
)

export default store