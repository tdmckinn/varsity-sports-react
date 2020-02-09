import * as React from 'react'
import cx from 'classnames'

import './styles/Button.scss'

interface ButtonProps {
  className?: string
  text?: string
  click: () => void
  alt?: boolean
  disabled?: boolean
  title?: string
  children?: any
}

const Button = ({ alt, children, click, text, disabled }: ButtonProps) => (
  <button
    type="button"
    className={cx('vsf-button button', {
      'is-primary': !alt,
      'is-alt': alt,
    })}
    disabled={disabled}
    onClick={() => {
      if (click) {
        click()
      }
    }}
  >
    {text}
    {children ? <div className="vsf-button__slot">{children}</div> : ''}
  </button>
)

export default Button
