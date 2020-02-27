import * as React from 'react'
import cx from 'classnames'

import './styles/Button.scss'

interface ButtonProps {
  classes?: string
  text?: string
  click?: () => void
  alt?: boolean
  disabled?: boolean
  title?: string
  children?: any
  type?: string
}

const Button = ({
  alt,
  children,
  classes,
  click,
  text,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) => {
  let btnProps = {}
  if (type !== 'submit') {
    btnProps = {
      onClick: () => {
        if (click) {
          click()
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
          'is-primary': !alt,
          'is-alt': alt
        },
        classes
      )}
      disabled={disabled}
      {...props}
      {...btnProps}
    >
      {text}
      {children ? <div className="vsf-button__slot">{children}</div> : ''}
    </button>
  )
}

export default Button
