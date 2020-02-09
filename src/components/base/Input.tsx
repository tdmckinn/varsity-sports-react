import * as React from 'react'
import cx from 'classnames'
import { observer } from 'mobx-react'

interface IInputProps {
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
  name?: string
  placeholder?: string
  type?: string
  value?: string
  data?: any
  invalidMsg?: string
  isFocusOnMount?: boolean
  onBlur?: (event: React.FocusEvent<HTMLInputElement>, data: any) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (event: React.KeyboardEvent<HTMLInputElement>, data: any) => void
}

@observer
class Input extends React.Component<IInputProps, { isFocused: boolean }> {
  static defaultProps = {
    attributes: {},
    type: 'text',
    isInvalid: false,
    value: '',
    checked: false,
    isFocusOnMount: false,
  }
  inputRef: any

  constructor(props: IInputProps) {
    super(props)
    this.state = {
      isFocused: false,
    }

    this.setInputRef = this.setInputRef.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    if (this.props.isFocusOnMount) {
      this.inputRef.focus()
    }
  }

  onBlur(e: React.FocusEvent<HTMLInputElement>) {
    this.setState({ isFocused: false })
    if (this.props.onBlur) {
      this.props.onBlur(e, this.props.data)
    }
  }

  onFocus(e: React.FocusEvent<HTMLInputElement>) {
    this.setState({ isFocused: true })
    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  onChange(e: React.KeyboardEvent<HTMLInputElement>) {
    if (this.props.onChange) {
      this.props.onChange(e, this.props.data)
    }
  }

  setInputRef(input: HTMLInputElement) {
    this.inputRef = input
  }

  render() {
    const {
      id,
      attributes,
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
    } = this.props

    const { isFocused } = this.state

    return (
      <>
        {icon}
        <input
          {...attributes}
          className={cx('vsf-input input', className, {
            'is-focused': isFocused,
            'is-invalid': isInvalid,
            'is-vertical': isVertical,
            'is-stretched': isStretched,
            'is-borderless': isBorderless,
          })}
          ref={this.setInputRef}
          checked={checked}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          type={type}
          name={name}
          id={id || name}
        />
      </>
    )
  }
}

export default Input
