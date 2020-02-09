import * as React from 'react'

import './Notification.scss'

interface NotificationProps {
  message: string
  children: any
}

const Notification = ({ message, children }: NotificationProps) => (
  <div className="notification">
    <button className="delete" />
    {message}
    <>{children}</>
  </div>
)

export default Notification
