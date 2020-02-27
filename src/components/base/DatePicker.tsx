import React from 'react'
import { useField } from 'formik'
import Flatpickr from 'react-flatpickr'

import 'flatpickr/dist/flatpickr.min.css'

const DatePicker = ({ ...props }: any) => {
  const [field, _meta, helpers] = useField(props) as any
  return (
    <Flatpickr
      {...props}
      {...field}
      onChange={(e) => {
        helpers.setValue(e)
      }}
      className="'vsf-input input"
      type="date"
    />
  )
}

export default DatePicker
