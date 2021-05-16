//main function
export const displayNotification = (content, color, timeout) => {

    return async dispatch => {
        dispatch({
            type: 'DISPLAY',
            data: {
                content,
                style: {
                    color,
                    border: '20px solid',
                    fontSize: 'x-large',
                    borderWidth: 'thick',
                    backgroundColor: 'antiquewhite',
                    borderColor: color,
                    padding: '5px'
                },
                show: true
            }
        })

         setTimeout(() => {
            dispatch({
                type: 'HIDE',
                data: {
                    content: '',
                    style: {
                        display: 'none'
                    },
                    show: false
                }
            }) 
        }, timeout);
      }
}



//initial state
const initialState = { 
    data: {
        content: '', 
        style: {
            color: 'transparent',
            display: 'none',
        },
        show: false
    }
}


//reducer
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'DISPLAY': {
            return {
                ...state,
                data: action.data
            }
        }
        case 'HIDE': {
            return { ...state, 
                data: action.data
            }
        }
        default: {
            return { 
                ...state
            }
        }
    }

}

export default reducer