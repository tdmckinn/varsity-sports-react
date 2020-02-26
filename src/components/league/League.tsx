import * as React from 'react'
import { Link } from 'react-router-dom'
import { format, isPast } from 'date-fns'
import { useMutation } from 'urql'

import {
  Button,
  Modal,
  Input,
  FieldSet,
  LeagueModiferModal,
} from '../../components'
import { DRAFT_DATE_TIME_FORMAT } from '../../const'
import { useStores } from '../../hooks/use-stores'
import { ILeague } from '../../types'

import './styles/League.scss'

interface LeagueProps {
  league: ILeague
  actions?: JSX.Element
  children?: any
}

const draftDate = (date: Date) => {
  if (!date) {
    return ''
  }
  return format(new Date(Number(date)), DRAFT_DATE_TIME_FORMAT)
}

const joinLeague = `
  mutation($input: JoinLeagueInput!) {
    joinLeague(input: $input) {
      id
      LeagueID
      OwnerID
    }
  }
`

const League = ({ league, children }: LeagueProps) => {
  const {
    authStore: { user },
  } = useStores()

  const [joinLeagueResponse, executeJoinLeagueMutation] = useMutation(
    joinLeague
  )
  const [isLeagueModiferModalActive, showLeagueModiferModal] = React.useState(
    false
  )
  const [isJoinLeagueModalActive, setJoinLeagueDisplay] = React.useState(false)
  const [leagueToJoinId, setLeagueToJoinId] = React.useState('')
  const [newTeam, setNewTeam] = React.useState({ name: '' })

  const displayJoinLeagueModal = (id: any) => {
    setJoinLeagueDisplay(true)
    setLeagueToJoinId(id)
  }

  const isLeagueCommissioner = league.CommissionerID === user.id
  const hasUserJoinedLeague =
    isLeagueCommissioner ||
    league.LeagueTeams.some(
      (team: { OwnerID: string }) => team.OwnerID === user.id
    )

  const editLeague = () => {
    showLeagueModiferModal(true)
  }

  const draftDateTime = new Date(Number(league.DraftDateTime))
  const isDraftPast = isPast(draftDateTime)
  const draftTimeLabelText = isDraftPast ? 'Draft Ended' : 'Draft Start'
  return (
    <>
      <div className="vsf-league">
        <div className="vsf-league__item" key={league.id}>
          <div className="vsf-league__content">
            <span className="vsf-league__name">{league.LeagueName}</span>
            <span className="vsf-league__tag tag is-light">
              {league.LeagueTeams.length} of {league.LeagueSettings.MaxTeams}{' '}
              Members
            </span>
            <span className="vsf-league__tag tag is-light">
              {draftTimeLabelText}: {draftDate(draftDateTime)}
            </span>
          </div>

          <div className="vsf-league__actions">
            <Link className="button is-success" to={`/leagues/${league.id}`}>
              <i className="material-icons">open_in_new</i>
              League Lobby
            </Link>
            <Button
              text="Join League"
              click={() => displayJoinLeagueModal(league.id)}
              disabled={hasUserJoinedLeague}
              alt
            />
            {isLeagueCommissioner ? (
              <Button text="Edit League" click={() => editLeague()} alt />
            ) : null}
          </div>
          <div className="vsf-league__settings">
            <div className="vsf__divider" />
            <span>
              <i className="material-icons">perm_data_setting</i>
            </span>{' '}
            Settings
          </div>
        </div>
      </div>
      {isLeagueModiferModalActive ? (
        <LeagueModiferModal
          type="editLeague"
          close={() => {
            showLeagueModiferModal(!isLeagueModiferModalActive)
          }}
        />
      ) : null}
      {isJoinLeagueModalActive ? (
        <Modal isAcitve>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Enter Team Details</p>
              <button className="delete" onClick={() => console.log('')} />
            </header>
            <section className="modal-card-body">
              <FieldSet text="Team Name">
                <Input value={newTeam.name} placeholder="Team Name Here" />
              </FieldSet>
            </section>
            <footer className="modal-card-foot">
              <a
                className="button"
                onClick={(e: any) => {
                  e.preventDefault()
                  showLeagueModiferModal(false)
                }}
              >
                Close
              </a>
              <Button
                text="Save"
                alt
                click={() => {
                  if (!newTeam.name) {
                    console.log('Must enter team name')
                    return false
                  }
                  executeJoinLeagueMutation({
                    id: leagueToJoinId,
                    LeagueID: newTeam,
                    OwnerID: user.id,
                  })
                }}
              />
            </footer>
          </div>
        </Modal>
      ) : null}
    </>
  )
}
export default League
