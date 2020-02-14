import * as React from 'react'
import { Formik } from 'formik'
import flatpickr from 'flatpickr'
import { useMutation, useQuery } from 'urql';
import { observer } from 'mobx-react'

import './styles/LeagueModiferModal.scss'

import { Button, Modal, FieldSet, Input, LeagueSettings } from '..'
import { useStores } from '../../hooks/use-stores'
import { getSettings } from '../../queries/settings';

const createLeagueMutation = `
mutation($league: CreateLeagueInput!) {
  createLeague(league: $league) {
    id
    CommissionerID
    LeagueName
  }
}
`

const LeagueModifierModal = observer(() => {
  const { authStore: { user } } = useStores();
  const [{ fetching, error, data }] = useQuery({
    query: getSettings
  })
  const [joinLeagueResponse, executeCreateLeagueMutation] = useMutation(createLeagueMutation);
  const [league, setLeague] = React.useState({
    leagueId: null,
    isSettingsEditMode: false,
    leagueSettings: {},
    settings: [],
    leagueName: {
      value: '',
      isFocusOnMount: true
    },
    draftDateTime: '',
    teamName: '',
    commissionerName: user.fullName,
    isValidForm: true
  })

  const modalTitle = league.isSettingsEditMode
    ? `Edit League Settings - ${league.teamName}`
    : 'Create New League'

  React.useEffect(() => {
    const datePickerEl = document.querySelector(
      '#leagueModiferDraftDateTimer input'
    ) as HTMLElement

    if (datePickerEl) {
      flatpickr(datePickerEl, {
        dateFormat: 'M d, Y H:i',
        enableTime: true,
      })
    }
  }, [])


  const userCreateLeague = (leagueFormValues: any) => {
    /**
     * TODO: Validations
     */
    const newLeague = {
      CommissionerID: user.id,
      LeagueName: leagueFormValues.name,
      CommissionerName: leagueFormValues.commissionerName,
      // DraftDateTime: FormData(new Date(this.draftDateTime), 'YYYY-MM-dd HH:mm'),
      TeamName: leagueFormValues.teamName,
    }

    executeCreateLeagueMutation({
      league: newLeague
    })
      .then(({ data: { createLeague } }: any) => {
        console.log(createLeague)
        alert('League saved continue editing...')

        setLeague({
          ...league,
          leagueId: createLeague.id,
          isSettingsEditMode: true
        })
      })

    //  this.$apollo
    //     .mutate({
    //       mutation: gql`
    //             mutation($league: CreateLeagueInput!) {
    //               createLeague(league: $league) {
    //                 id
    //                 CommissionerID
    //                 LeagueName
    //               }
    //             }
    //           `,
    //       variables: {
    //         league: newLeague
    //       }
    //     })
    //     .then(({ data: { createLeague } }: any) => {
    //       console.log(createLeague)
    //       alert('League saved continue editing...')
    //       this.state.leagueId = createLeague.id
    //       this.state.isSettingsEditMode = true
    //     })
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

    // this.$apollo
    //   .mutate({
    //     mutation: gql`
    //           mutation($settings: UpdateLeagueSettingsInput!) {
    //             updateLeagueSettings(settings: $settings) {
    //               id
    //             }
    //           }
    //         `,
    //     variables: {
    //       settings: updatedSettings
    //     }
    //   })
    //   .then(() => {
    //     alert('Updating League Settings Successful')
    //     this.close()
    //   })
  }

  return (
    <Modal isAcitve>
      <div className="league-modifer-modal modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{modalTitle}</p>
          <button className="delete" onClick={() => console.log('close')} />
        </header>
        <section className="modal-card-body">
          <p className="league-modifer-modal__note">
            * Note once you create a new league you will automatically have an
            associated team created. Team details can be changed later.
            </p>
          <Formik
            initialValues={{ name: "" }}
            onSubmit={async values => {
              await new Promise(resolve => setTimeout(resolve, 500));
              console.log("VAUES >>>", values)
              userCreateLeague(values)
            }}
          >
            <form>
              {!league.isSettingsEditMode ? (
                <div>
                  <FieldSet text="League Name">
                    <Input
                      value="leagueName.value"
                      placeholder="League Name Here"
                    />
                  </FieldSet>
                  <FieldSet text="Commissioner Name">
                    <Input value="commissionerName" type="text" />
                  </FieldSet>
                  <FieldSet text="Draft Date / Time">
                    <Input
                      id="leagueModiferDraftDateTimer"
                      value="draftDateTime"
                      type="text"
                      placeholder="Date Here"
                    />
                  </FieldSet>
                  <div className="vsf__divider" />
                  <h5 className="title is-5">
                    Team: <span>{league.teamName}</span>
                  </h5>
                  <FieldSet text="Team Name">
                    <Input value="teamName" placeholder="Team Name Here" />
                  </FieldSet>
                  <div className="vsf__divider" />
                </div>
              ) : (
                  <div>
                    League Settings
                  {/* <LeagueSettings defaultSettingsConfig={settings} leagueSettings={leagueSettings} /> */}
                  </div>
                )}
            </form>
          </Formik>
        </section>
        <footer className="modal-card-foot">
          <a className="button" onClick={() => console.log('close')}>
            Cancel
            </a>
          {league.isSettingsEditMode ? (
            <Button
              type="submit"
              text="Save Settings"
              click={saveLeagueSettings}
              alt
            />
          ) : (
              <Button type="submit" text="Submit" alt />
            )}
        </footer>
      </div>
    </Modal>
  )
})

export default LeagueModifierModal
