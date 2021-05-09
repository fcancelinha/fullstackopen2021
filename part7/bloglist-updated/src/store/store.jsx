import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from '../reducers/blogReducer'
import notificationReduxer from '../reducers/notificationReducer'
import userReducer from '../reducers/userReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    blog: blogReducer,
    notification: notificationReduxer,
    user: userReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store