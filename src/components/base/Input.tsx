import * as React from 'react'
import cx from 'classnames'
import { FormikFormProps } from 'formik'

interface InputProps {
  id?: string
  attributes?: any
  checked?: boolean
  className?: string
  disabled?: boolean
  icon?: any
  isInvalid?: boolean
  isVertical?: boolean
  isStretched?: boolean
  isBorderless?: boolean
  isFocusOnMount?: boolean
  name?: string
  placeholder?: string
  type?: string
  value?: string
  data?: any
  invalidMsg?: string
  tag?: string
  field?: any
  form?: FormikFormProps
  onBlur?: (event: React.FocusEvent<HTMLInputElement>, data: any) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (event: React.KeyboardEvent<HTMLInputElement>, data: any) => void
}

interface InputState {
  isFocused: boolean
}

class Input extends React.Component<InputProps, InputState> {
  static defaultProps = {
    attributes: {},
    type: 'text',
    isInvalid: false,
    value: '',
    tag: 'input',
    checked: false,
    isFocusOnMount: false,
  }
  inputRef: any

  state = {
    isFocused: false,
  }

  componentDidMount() {
    if (this.props.isFocusOnMount) {
      this.inputRef.focus()
    }
  }

  onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ isFocused: false })
    const { data, field, onBlur } = this.props

    if (field && field.onBlur) {
      field.onBlur(e)
    } else if (onBlur) {
      onBlur(e, data)
    }
  }

  onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ isFocused: true })
    const { field, onFocus } = this.props

    if (field && field.onFocus) {
      field.onFocus(e)
    } else if (onFocus) {
      onFocus(e)
    }
  }

  onChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { data, field, onChange } = this.props

    if (field && field.onChange) {
      field.onChange(e)
    } else if (onChange) {
      onChange(e, data)
    }
  }

  setInputRef = (input: HTMLInputElement) => {
    this.inputRef = input
  }

  render() {
    const {
      id,
      checked,
      className,
      disabled,
      icon = null,
      isInvalid,
      isVertical,
      isStretched,
      isBorderless,
      name,
      placeholder,
      type,
      value,
      field,
    } = this.props

    const { isFocused } = this.state
    const inputProps = {
      id,
      disabled,
      placeholder,
      name: field ? field.name : name,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange as any,
      value: field ? field.value : value,
    }

    return (
      <>
        {icon}
        {
          <input
            className={cx('vsf-input input', className, {
              'is-focused': isFocused,
              'is-invalid': isInvalid,
              'is-vertical': isVertical,
              'is-stretched': isStretched,
              'is-borderless': isBorderless,
            })}
            checked={field ? field.checked : checked}
            disabled={disabled}
            ref={this.setInputRef}
            type={type}
            {...inputProps}
          />
        }
      </>
    )
  }
}

export default Input
