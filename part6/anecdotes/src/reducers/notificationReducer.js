export const displayNotification = (content) => {
    return {
        type: 'DISPLAY',
        data: {
            content,
            style: {
                border: 'solid',
                padding: 10,
                borderWidth: 1,
            }
        }
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE',
        data: {
            content: '',
            style: {
                display: 'none'
            },
        }
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
        console.log('state now: ', state)
        console.log('action', action)
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