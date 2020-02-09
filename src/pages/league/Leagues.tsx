import * as React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { observer, inject } from 'mobx-react'
import { useMutation, useQuery } from 'urql';

import {
  League,
  SectionHeader,
  Button,
  Modal,
  Input,
  FieldSet,
  LeagueModiferModal,
} from '../../components'
import { AuthStore, Stores } from '../../stores'
import { ILeague } from '../../components/league/League'

import './Leagues.scss'

interface LeaguesProps {
  authStore: AuthStore
}

interface LeaguesState { }

const getLeagues = gql`
query GetLeagues() {
  leagues {
    id
    DraftDateTime
    LeagueName
    CommissionerID
    LeagueSettings {
      DraftType
      Scoring
      MaxTeams
      WaiverType
      RosterPositions
      TradeDeadline
    }
    LeagueTeams {
      id
      OwnerID
    }
  }
}
`

const joinLeague = `
mutation($input: JoinLeagueInput!) {
  joinLeague(input: $input) {
    id
    LeagueID
    OwnerID
  }
}
`

const Leagues = inject(({ stores }: { stores: Stores }) => ({
  authStore: stores.authStore as AuthStore,
}))
observer(({ authStore }: LeaguesProps) => {
  const [{ fetching, error, data }] = useQuery({
    query: getLeagues
  });
  const [joinLeagueResponse, executeJoinLeagueMutation] = useMutation(joinLeague);

  if (fetching) {
    return <div>"Loading..."</div>;
  } else if (error) {
    return <div>":( Couldn't load leagues try again"</div>;
  }

  const [isLeagueModiferModalActive, showLeagueModiferModal] = React.useState(false)
  const [isJoinLeagueModalActive, setJoinLeagueDisplay] = React.useState(false)
  const [leagueToJoinId, setLeagueToJoinId] = React.useState('')
  const [newTeam, setNewTeam] = React.useState({ name: '' })

  const leagues = data.leagues;
  const user = authStore.user;

  const hasMaxLeaguesCreated = () => {
    return (
      leagues &&
      leagues.filter(
        (league: any) => league.CommissionerID === user.id
      ).length === 5
    )
  }

  const displayJoinLeagueModal = (id: any) => {
    setJoinLeagueDisplay(true);
    setLeagueToJoinId(id)
  }

  const isUserJoinedLeague = (league: any) => {
    return (
      league.CommissionerID === user.id ||
      league.LeagueTeams.some(
        (team: { OwnerID: any }) => team.OwnerID === user.id
      )
    )
  }


  const editLeague = () => {
    // TODO: Implement me!
  }

  const close = () => {
    setLeagueToJoinId('')
    setNewTeam({ name: '' })
  }

  return (
    <div className="vsf-app__leagues">
      <SectionHeader title="Leagues" />
      <section>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{leagues.length}</strong> League(s)
                </p>
            </div>
            <div className="level-item">
              <div className="field has-addons">
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Find a league"
                  />
                </p>
                <p className="control">
                  <button className="button">Search Leagues</button>
                </p>
              </div>
            </div>
          </div>
          <div className="level-right">
            <p className="level-item">
              <Button
                className="is-success"
                text="Create League"
                disabled={hasMaxLeaguesCreated()}
                title={hasMaxLeaguesCreated()
                  ? 'Max Leagues Per User: 5'
                  : 'Create A League'}
                click={() => {
                  showLeagueModiferModal(true)
                }}
              />
            </p>
          </div>
        </nav>
        {leagues.map((league: any, index: number) => (
          <League key={index} league={league}>
            <div className="nfx-league__actions">
              <Link
                className="button is-success"
                to={`/leagues/${league.id}`}
              >
                League Lobby
                </Link>
              <Button
                text="Join League"
                click={() => displayJoinLeagueModal(league.id)}
                disabled={isUserJoinedLeague(league)}
                alt
              />
              <Button
                text="Edit League"
                click={() => editLeague()}
                alt
                disabled
              />
            </div>
            <div className="nfx-league__settings">
              <div className="nfx__divider" />
              <span>
                <i className="material-icons">perm_data_setting</i>
              </span>{' '}
              Settings
              </div>
          </League>
        ))}
      </section>
      {isLeagueModiferModalActive ? <LeagueModiferModal /> : ''}
      {isJoinLeagueModalActive ? (
        <Modal isAcitve>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Enter Team Details</p>
              <button className="delete" onClick={() => console.log('')} />
            </header>
            <section className="modal-card-body">
              <FieldSet text="Team Name">
                <Input value={'newTeam.name'} placeholder="Team Name Here" />
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
              <Button text="Save" alt click={() => {
                if (!newTeam) {
                  console.log('Must enter team name')
                  return false;
                }
                executeJoinLeagueMutation({ id: leagueToJoinId, LeagueID: newTeam, OwnerID: user.id })
              }
              } />
            </footer>
          </div>
        </Modal>
      ) : null}
    </div>
  )
})

export default Leagues;