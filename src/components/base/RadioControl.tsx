import * as React from 'react'
import { useField } from 'formik'

const RadioControl = ({ options, ...props }: any) => {
  const [field, _meta, helpers] = useField(props) as any
  return (
    <div className="control">
      {options.map(({ id, value }: any, index) => {
        return (
          <label className="radio" key={id ?? index}>
            <input
              {...props}
              {...field}
              value={value}
              onChange={(e) => {
                helpers.setValue(e.currentTarget.value)
              }}
              type="radio"
              defaultChecked={value}
            />
            {value}
          </label>
        )
      })}
    </div>
  )
}

export default RadioControl
