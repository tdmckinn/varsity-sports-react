import * as React from 'react'

import './Fieldset.scss'

interface FieldsetProps {
  text: string
  helpText?: string
  children: any
}

const FieldSet = ({ text, helpText, children }: FieldsetProps) => (
  <fieldset className="vsf-fieldset field">
    <label className="label">{text}</label>
    <div className="control">{children}</div>
    {helpText ? <p className="help">{helpText}</p> : ''}
  </fieldset>
)

export default FieldSet
