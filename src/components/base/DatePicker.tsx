import React from 'react'
import { useField, FieldInputProps, Form } from 'formik'
import Flatpickr from 'react-flatpickr'

import 'flatpickr/dist/flatpickr.min.css'

const DatePicker = ({ ...props }: any) => {
  const [field, meta, helpers] = useField(props) as any
  return (
    <Flatpickr {...field} {...props} onChange={(e) => {
      helpers.setValue(e)
    }} className="'vsf-input input" type="date" />
  )
}

export default DatePicker
