import React from 'react'
import Part from './Part'

const Content = ({parts}) => {

    //console.log(parts)

    return (
        parts.map(({name, exercises, id}) => <li key={id}><Part name={name} exercises={exercises}/></li>)
    )
  }

export default Content
