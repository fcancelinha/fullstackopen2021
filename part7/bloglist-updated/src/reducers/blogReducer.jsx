import blogService from '../services/blogService'

export const initializeBlogs = () => {
    return async dispatch => { 
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            payload: blogs
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.createBlog(blog)
        console.log("new blog", newBlog)
        dispatch({
            type: 'CREATE',
            payload: newBlog
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)    
        dispatch({
            type: 'DELETE',
            payload: id
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch =>{
        await blogService.updateBlog(blog)
        dispatch({
            type: 'UPDATE',
            payload: blog
        })
    }
}


//reducer
const reducer = (state = [], action) => {

    const payload = action.payload

    switch (action.type) {
        case 'CREATE': {
            return [...state, payload]
        }
        case 'DELETE': {
            return [...state.filter(blog => blog.id !== payload)]
        }
        case 'UPDATE': {
            return [...state.map((blog => blog.id === payload.id ? payload : blog))]
        }
        case 'INIT':{
            return [...action.payload.sort((a,b) => b.likes - a.likes)]
        }
        default: {
            return state
        }
    }
}


export default reducer