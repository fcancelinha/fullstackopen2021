import React, { useState, useImperativeHandle } from 'react'

const Toggleable = React.forwardRef((props, ref) => {
    const [visibility, setVisibility] = useState(false)

    const hideWhenVisible = { display: visibility ? 'none' : '' }
    const showWhenVisible = { display: visibility ? '' : 'none' }

    const toggle = () => {
        setVisibility(!visibility)
    }

    useImperativeHandle(ref, () => {
        return {
            toggle
        }
    })

    return (

        <div>
            <div style={hideWhenVisible}>
              <button type="button" onClick={toggle}>{props.buttonLabel}</button>
            </div>

            <div style={showWhenVisible}>
                {props.children}
               <button type="button" onClick={toggle}>Cancel</button>
            </div>
            
        </div>
    )
})

export default Toggleable
