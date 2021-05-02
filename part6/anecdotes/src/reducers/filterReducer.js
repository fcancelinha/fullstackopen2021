
export const filterAnecdote = (content) => {
    return {
        type: 'FILTER',
        content
    }
}

const initialState = {content: ''}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case 'FILTER': {
            return {
                ...state,
                content: action.content
            }
        }
        default: 
            return state
    }


}

export default reducer