export const displayNotification = (content, timeout) => {

    return async dispatch => {
        dispatch({
            type: 'DISPLAY',
            data: {
                content,
                style: {
                    border: 'solid',
                    padding: 10,
                    borderWidth: 1,
                }
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
                }
            }) 
        }, timeout);
      }
}

const initialState = {
    data: {
        content: '',
        style: {
            display: 'none'
        }
    }
}


const reducer = (state = initialState, action) => {

        const type = action.type

        switch (type) {
            case 'DISPLAY': {
                return {
                    ...state,
                    data: action.data
                }
            }
            case 'HIDE': {
                return {
                    ...state,
                    data: action.data
                }
            }
            default:
                return state
        }
    }

export default reducer