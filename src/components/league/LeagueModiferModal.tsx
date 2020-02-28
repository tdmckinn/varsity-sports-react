import * as React from 'react'
import { Formik, Field } from 'formik'
import { useMutation } from 'urql'
import { observer } from 'mobx-react'
import cx from 'classnames'

import './styles/LeagueModiferModal.scss'

import { Button, Modal, FieldSet, Input, DatePicker, LeagueSettings } from '..'
import { useStores } from '../../hooks/use-stores'
import { ILeague } from '../../types'

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

interface LeagueModifierModalProps {
  close: () => void
  type: string
  selectedLeague?: ILeague
}

const LeagueModifierModal = observer(
  ({ close, selectedLeague, type }: LeagueModifierModalProps) => {
    const {
      authStore: { user },
    } = useStores()

    const [_result, createLeagueMutation] = useMutation(
      createLeagueMutationQuery
    )
    const [__result, updateLeagueSettingsMutation] = useMutation(
      updateLeagueSettingsMutationQuery
    )

    const [league, setLeague] = React.useState({
      id: selectedLeague?.id,
      isSettingsEditMode: type === 'editLeague',
      leagueSettings: selectedLeague?.LeagueSettings ?? {},
      leagueName: selectedLeague?.LeagueName ?? "",
      draftDateTime: selectedLeague?.DraftDateTime ?? "",
      teamName: "",
      commissionerName: user.fullName,
    })

    const userCreateLeague = (leagueFormValues: any) => {
      console.log(leagueFormValues)
      /**
       * TODO: Validations
       */
      const newLeague = {
        CommissionerID: user.id,
        LeagueName: leagueFormValues.leagueName,
        CommissionerName: leagueFormValues.commissionerName,
        DraftDateTime: leagueFormValues.draftDateTime[0],
        TeamName: leagueFormValues.teamName,
      }

      // createLeagueMutation({
      //   league: newLeague,
      // }).then(({ data: { createLeague } }: any) => {
      //   console.log(createLeague)
      //   alert('League saved continue editing...')

      //   console.log(createLeague, leagueFormValues)
      //   setLeague({
      //     ...leagueFormValues,
      //     leagueId: createLeague.id,
      //     isSettingsEditMode: true,
      //   })
      // })
    }

    const saveLeagueSettings = (leagueFormValues: any) => {
      const updatedLeagueSettings = {
        ...leagueFormValues.leagueSettings,
        MaxTeams: leagueFormValues.MaxTeams?.value ?? 10,
        LeagueID: leagueFormValues.id,
      }

      console.log(updatedLeagueSettings)

      delete updatedLeagueSettings.__typename

      updateLeagueSettingsMutation({
        settings: updatedLeagueSettings,
      }).then(({ data: { settings } }: any) => {
        alert('Updating League Settings Successful')
        close()
      })
    }

    return (
      <Modal isAcitve>
        <div
          className={cx('league-modifer-modal modal-card', {
            'is-create': !league.isSettingsEditMode,
            'is-edit': league.isSettingsEditMode,
          })}
        >
          <header className="modal-card-head">
            <p className="modal-card-title">
              {league.isSettingsEditMode
                ? `Edit League Settings - ${league.leagueName}`
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
               ...league
              }}
              onSubmit={async ({teamName, ...values }) => {
                // if (!isValidForm) {
                //   alert('Form invalid please fix errors to continue.')
                // }
                console.log('VAUES >>>', values)

                if (league.isSettingsEditMode) {
                  saveLeagueSettings(values)
                } else {
                  userCreateLeague({
                    teamName,
                    ...values
                  })
                }
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
                          options={{
                            enableTime: true,
                            minTime: '16:00',
                            maxTime: '22:00',
                          }}
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
                  ) : (
                    <LeagueSettings
                      leagueSettings={props.values.leagueSettings}
                    />
                  )}
                  <footer className="modal-card-foot">
                    <a className="button" onClick={close}>
                      Cancel
                    </a>
                    <Button
                      type="submit"
                      text={
                        league.isSettingsEditMode ? 'Save Settings' : 'Submit'
                      }
                      alt
                    />
                  </footer>
                </form>
              )}
            </Formik>
          </section>
        </div>
      </Modal>
    )
  }
)

export default LeagueModifierModal
