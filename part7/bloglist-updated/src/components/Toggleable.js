import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const Toggleable = React.forwardRef((props, ref) => {
    const [visibility, setVisibility] = useState(false)


    Toggleable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }

    Toggleable.displayName = 'Toggleable'

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
            <Button variant="primary" className="mt-5" style={hideWhenVisible} onClick={toggle} block>
                {props.buttonLabel}
            </Button>
            
            <div style={showWhenVisible}>
                    {props.children}
            <Button variant="secondary" onClick={toggle} block>Cancel</Button>
            </div>

        </div>
    )
})

export default Toggleable
