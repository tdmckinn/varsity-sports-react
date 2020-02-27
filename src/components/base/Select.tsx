import * as React from 'react'
import ReactSelect from 'react-select'
import { useField } from 'formik'

const Select = ({ label, options = [], ...props }: any) => {
  const [field, _meta, helpers] = useField(props)

  const selectOptions = label
    ? options.map(({ value }) => ({
        label: value,
        value,
      }))
    : options
  const handleChange = (selectedOption) => {
    helpers.setValue(selectedOption)
  }
  return (
    <ReactSelect
      backspaceRemovesValue={false}
      {...props}
      {...field}
      options={selectOptions}
      onChange={handleChange}
    />
  )
}

export default Select
