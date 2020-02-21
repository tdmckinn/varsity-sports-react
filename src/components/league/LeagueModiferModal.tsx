import * as React from 'react'
import { Formik, Field } from 'formik'
import { useMutation } from 'urql'
import { observer } from 'mobx-react'

import './styles/LeagueModiferModal.scss'

import { Button, Modal, FieldSet, Input, DatePicker, LeagueSettings } from '..'
import { useStores } from '../../hooks/use-stores'

const createLeagueMutationQuery = `
  mutation($league: CreateLeagueInput!) {
    createLeague(league: $league) {
      id
      CommissionerID
      LeagueName
    }
  }
`

const updateLeagueSettingsMutationQuery = `
  mutation($settings: UpdateLeagueSettingsInput!) {
    updateLeagueSettings(settings: $settings) {
      id
    }
  }
`

const LeagueModifierModal = observer(({ close }: any) => {
  const {
    authStore: { user },
  } = useStores()

  const [_result, createLeagueMutation] = useMutation(createLeagueMutationQuery)
  const [__result, updateLeagueSettingsMutation] = useMutation(
    updateLeagueSettingsMutationQuery
  )

  const [league, setLeague] = React.useState({
    leagueId: null,
    isSettingsEditMode: false,
    leagueSettings: {},
    settings: [],
    leagueName: {
      value: '',
      isFocusOnMount: true,
    },
    draftDateTime: '',
    teamName: '',
    commissionerName: user.fullName,
    isValidForm: true,
  })

  const userCreateLeague = (leagueFormValues: any) => {
    console.log(leagueFormValues)
    /**
     * TODO: Validations
     */
    const newLeague = {
      CommissionerID: user.id,
      LeagueName: leagueFormValues.name,
      CommissionerName: leagueFormValues.commissionerName,
      // DraftDateTime: FormData(new Date(this.draftDateTime), 'YYYY-MM-dd HH:mm'),
      // TeamName: leagueFormValues.teamName,
    }

    createLeagueMutation({
      league: newLeague,
    }).then(({ data: { createLeague } }: any) => {
      console.log(createLeague)
      alert('League saved continue editing...')

      console.log(createLeague, leagueFormValues)
      setLeague({
        ...leagueFormValues,
        leagueId: createLeague.id,
        isSettingsEditMode: true,
      })
    })
  }

  const saveLeagueSettings = () => {
    const readonlySettings: any = league.settings
      .filter(({ readOnly }: any) => readOnly)
      .map(({ id, value, values, singleValues }: any) => {
        return { [id]: value || values || singleValues }
      })
      .reduce((val: any, nextSetting: any) => {
        const setting = Object.entries(nextSetting)[0]
        val[setting[0] as any] = setting[1]
        return val
      }, {})

    const updatedSettings = {
      LeagueID: league.leagueId,
      ...league.leagueSettings,
      ...readonlySettings,
    }

    updateLeagueSettingsMutation({
      settings: updatedSettings,
    }).then(({ data: { settings } }: any) => {
      alert('Updating League Settings Successful')
      close()
    })
  }

  return (
    <Modal isAcitve>
      <div className="league-modifer-modal modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {league.isSettingsEditMode
              ? `Edit League Settings - ${league.teamName}`
              : 'Create New League'}
          </p>
          <button className="delete" onClick={close} />
        </header>
        <section className="modal-card-body">
          <p className="league-modifer-modal__note">
            * Note once you create a new league you will automatically have an
            associated team created. Team details can be changed later.
          </p>
          <Formik
            initialValues={{
              leagueId: null,
              isSettingsEditMode: false,
              leagueSettings: {},
              leagueName: '',
              draftDateTime: '',
              teamName: '',
              commissionerName: user.fullName,
              isValidForm: true,
            }}
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500))
              console.log('VAUES >>>', values)
              userCreateLeague(values)
            }}
          >
            {({ ...props }: any) => (
              <form onReset={props.handleReset} onSubmit={props.handleSubmit}>
                {!league.isSettingsEditMode ? (
                  <div className="is-create-league">
                    <FieldSet text="League Name">
                      <Field
                        name="leagueName"
                        placeholder="League Name Here"
                        component={Input}
                      />
                    </FieldSet>
                    <FieldSet text="Commissioner Name">
                      <Field name="commissionerName" component={Input} />
                    </FieldSet>
                    <FieldSet text="Draft Date / Time">
                      <DatePicker
                        id="leagueModiferDraftDateTimer"
                        name="draftDateTime"
                        placeholder="Date Here"
                      />
                    </FieldSet>
                    <div className="vsf__divider" />
                    <h5 className="title is-5">
                      Team: <span>{props.values.teamName}</span>
                    </h5>
                    <FieldSet text="Team Name">
                      <Field
                        name="teamName"
                        placeholder="Team Name Here"
                        component={Input}
                      />
                    </FieldSet>
                    <div className="vsf__divider" />
                  </div>
                ) : null}
              </form>
            )}
          </Formik>
        </section>
        <footer className="modal-card-foot">
          <a className="button" onClick={close}>
            Cancel
          </a>
          <Button
            type="submit"
            text={league.isSettingsEditMode ? 'Save Settings' : 'Submit'}
            alt
          />
        </footer>
      </div>
    </Modal>
  )
})

export default LeagueModifierModal
