import React, { useState } from 'react'

const Toggleable = (props) => {
    const [visibility, setVisibility] = useState(false)

    const hideWhenVisible = { display: visibility ? 'none' : '' }
    const showWhenVisible = { display: visibility ? '' : 'none' }

    const toggle = () => {
        setVisibility(!visibility)
    }


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
}

export default Toggleable
