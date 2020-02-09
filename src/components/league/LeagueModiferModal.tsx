import * as React from 'react'
import { Formik } from 'formik'
import flatpickr from 'flatpickr'
import gql from 'graphql-tag'
import { observer, inject } from 'mobx-react'

import { Button, Modal, FieldSet, Input, LeagueSettings } from '..'
import { Stores, AuthStore } from '../../stores'

import './styles/LeagueModiferModal.scss'

interface LeagueModifierModalProps {
  modalTitle?: string
  teamName?: string
  isSettingsEditMode?: boolean
  authStore?: AuthStore
}

const SETTINGS_QUERY = gql`
  {
    settings {
      id
      type
      text
      value
      values {
        id
        value
      }
      singleValues
      readOnly
    }
  }
`

@inject(({ stores }: { stores: Stores }) => ({
  authStore: stores.authStore as AuthStore,
}))
@observer
class LeagueModifierModal extends React.Component<LeagueModifierModalProps> {
  state = {
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
    commissionerName: 'user.fullName',
    isValidForm: true,
  } as any

  get user() {
    return this.props.authStore!.user
  }

  get modalTitle() {
    return this.state.isSettingsEditMode
      ? `Edit League Settings - ${this.state.leagueName.value}`
      : 'Create New League'
  }

  componentDidMount() {
    const datePickerEl = document.querySelector(
      '#leagueModiferDraftDateTimer input'
    ) as HTMLElement

    if (datePickerEl) {
      flatpickr(datePickerEl, {
        dateFormat: 'M d, Y H:i',
        enableTime: true,
      })
    }
  }

  close() {
    this.resetData()
  }

  resetData() {
    this.state.leagueId = null
    this.state.isSettingsEditMode = false
    this.state.leagueSettings = {}
    this.state.settings = []
    this.state.leagueName = {
      ...{
        value: '',
        isFocusOnMount: true,
      },
    }
    this.state.draftDateTime = ''
    this.state.commissionerName = ''
    this.state.isValidForm = true
  }

  createLeague() {
    /**
     * TODO: Validations
     */
    const newLeague = {
      CommissionerID: this.user.id,
      LeagueName: this.state.leagueName.value,
      CommissionerName: this.state.commissionerName,
      // DraftDateTime: FormData(new Date(this.draftDateTime), 'YYYY-MM-dd HH:mm'),
      TeamName: this.state.teamName,
    }

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

  saveLeagueSettings() {
    const readonlySettings: any = this.state.settings
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
      LeagueID: this.state.leagueId,
      ...this.state.leagueSettings,
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

  render() {
    const { modalTitle, teamName, isSettingsEditMode } = this.props

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
            <form>
              {!isSettingsEditMode ? (
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
                    Team: <span>{teamName}</span>
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
          </section>
          <footer className="modal-card-foot">
            <a className="button" onClick={() => console.log('close')}>
              Cancel
            </a>
            {isSettingsEditMode ? (
              <Button
                text="Save Settings"
                click={() => 'saveLeagueSettings'}
                alt
              />
            ) : (
              <Button text="Submit" click={() => 'createLeague'} alt />
            )}
          </footer>
        </div>
      </Modal>
    )
  }
}

export default LeagueModifierModal
