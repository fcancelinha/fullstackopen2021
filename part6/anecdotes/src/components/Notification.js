import React from 'react'
import { useSelector} from 'react-redux'


const Notification = () => {

  const notification = useSelector(state => state.notifications.data)

  return (
    <div style={notification.style}>
      {notification.content}
    </div>
  )
}

export default Notification