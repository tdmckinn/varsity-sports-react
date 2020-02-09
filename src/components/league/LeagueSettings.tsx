import * as react from 'react'
import { Formik } from 'formik'

import { Input, FieldSet, Select } from '..'

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

interface LeagueSettingsProps {
  defaultSettingsConfig: any
}

const LeagueSettings = ({
  defaultSettingsConfig = [],
}: LeagueSettingsProps) => (
  <div className="league-settings">
    <h5 className="league-settings__title title is-5">
      League Configuration / Draft Settings
    </h5>
    {defaultSettingsConfig.length !== 0 ? (
      <form>
        <div>
          {defaultSettingsConfig.map(
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
              let configElement = null
              switch (type) {
                case 'dropdown':
                  configElement = (
                    <Select
                      id={id}
                      options={values}
                      v-model="leagueSettings[config.id]"
                      placeholder="Select Item"
                    />
                  )
                  break
                case 'input':
                  configElement = (
                    <Input
                      type="text"
                      disabled={readOnly}
                      placeholder={value}
                      v-model="leagueSettings[config.id]"
                    />
                  )

                  break
                // case 'radio':
                //   // configElement = <RadioControl id={id} options={values} v-model="leagueSettings[config.id]" />
                //   break;
                case 'other':
                  configElement = (
                    <Input
                      type="text"
                      disabled={readOnly}
                      placeholder={singleValues.join(',')}
                      v-model="leagueSettings[config.id]"
                    />
                  )
                  break
              }

              return (
                <FieldSet key={id} text={text}>
                  {configElement}
                </FieldSet>
              )
            }
          )}
        </div>
      </form>
    ) : (
      ''
    )}
  </div>
)

export default LeagueSettings
