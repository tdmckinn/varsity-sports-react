import * as React from 'react'
import { Field } from 'formik'
import { useQuery } from 'urql'

import { Input, FieldSet, Select, RadioControl } from '..'
import { getSettings } from '../../queries/settings'

import './styles/LeagueSettings.scss'

interface SettingsConfig {
  id?: string
  type: string
  text: string
  values?: any
  readOnly?: boolean
  value?: any
  singleValues: any
}

const LeagueSettings = ({ leagueSettings }: any) => {
  const [{ fetching, error, data }] = useQuery({
    query: getSettings,
  })

  if (fetching) {
    return <div>Loading...</div>
  } else if (error || !data.settings) {
    return <div>":( Couldn't load league settings try again"</div>
  }

  return (
    <div className="league-settings">
      <h5 className="league-settings__title title is-5">
        League Configuration / Draft Settings
      </h5>
      {data.settings.length !== 0 ? (
        <div>
          {data.settings.map(
            (
              {
                id,
                type,
                values,
                text,
                readOnly,
                value,
                singleValues,
              }: SettingsConfig,
              index: number
            ) => {
              const getSettingElement = () => {
                switch (type) {
                  case 'dropdown':
                    return (
                      <Select
                        id={id}
                        options={values}
                        name={`leagueSettings.${id}`}
                        label="value"
                        placeholder="Select Item"
                      />
                    )
                  case 'input':
                    return (
                      <Field
                        type="text"
                        disabled={readOnly}
                        placeholder={value}
                        name={`leagueSettings.${id}`}
                        component={Input}
                      />
                    )
                  case 'radio':
                    return (
                      <RadioControl
                        options={values}
                        name={`leagueSettings.${id}`}
                      />
                    )
                  case 'other':
                    return (
                      <Field
                        type="text"
                        disabled={readOnly}
                        placeholder={singleValues.join(',')}
                        name={`leagueSettings.${id}`}
                        component={Input}
                      />
                    )
                  default:
                    return null
                }
              }

              const settingsElement = getSettingElement()

              return settingsElement ? (
                <FieldSet key={id} text={text}>
                  {settingsElement}
                </FieldSet>
              ) : null
            }
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default LeagueSettings
