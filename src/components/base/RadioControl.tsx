import * as React from 'react'
import { useField } from 'formik'

const RadioControl = ({ options, ...props }: any) => {
  const [field, _meta, helpers] = useField(props) as any
  return options.map(({ id, ...option }: any, index) => (
    <label className="radio" key={id ?? index}>
      <input
        {...props}
        {...field}
        value={option.value}
        onChange={(e) => {
          helpers.setValue(e.currentTarget.value)
        }}
        type="radio"
      />
      {option.value}
    </label>
  ))
}

export default RadioControl
