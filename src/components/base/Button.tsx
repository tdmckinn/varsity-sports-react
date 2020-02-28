import * as React from 'react'
import cx from 'classnames'

import './styles/Button.scss'

interface ButtonProps {
  alt?: boolean
  borderless?: boolean
  classes?: string
  children?: any
  text?: string
  onClick?: () => void
  disabled?: boolean
  title?: string
  icon?:  JSX.Element | string
  style?: any
  type?: string
}

const Button = ({
  alt,
  borderless,
  children,
  classes,
  onClick,
  disabled,
  icon,
  text,
  type = 'button',
  ...props
}: ButtonProps) => {
  let btnProps = {}
  if (type !== 'submit') {
    btnProps = {
      onClick: () => {
        if (onClick) {
          onClick()
        }
      },
    }
  }
  return (
    <button
      type={type}
      className={cx(
        'vsf-button button',
        {
          'is-borderless': borderless,
          'is-primary': !alt,
          'is-alt': alt
        },
        classes
      )}
      disabled={disabled}
      {...props}
      {...btnProps}
    >
      {icon}
      {text}
      {children ? <div className="vsf-button__slot">{children}</div> : ''}
    </button>
  )
}

export default Button
