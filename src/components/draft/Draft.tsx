import * as React from 'react'
import classNames from 'classnames'
import { useMutation } from 'urql'

import './styles/Draft.scss'
import { Button } from '..'
import DraftOrder from './DraftOrder'

interface Draft {
  selectedPick: any
  draftPickNumber: any
  lastPick: any
  players: any[]
}

const exitDraftMutation = `
mutation($userId: String!, $draftId: String!) {
  exitDraftSession(user: $user, draftId: $id) {
    success
  }
}
`

const draftQuery = `
query GetDraft($draftId: String!) {
  draft(draftId: $draftId) {
    id
    LeagueID
    CurrentRound
    CurrentUserDrafting
    DraftDateTime
    IsDraftComplete
    Rounds
    Teams {
      id
      OwnerID
      Name
      Picks
      Players {
        id
        Name
        TeamID
        LineUpPosition
      }
    }
    Players {
      id
      Rank
      Name
      Position
      Age
      FantasyPoints
      AverageDraftPosition
    }
  }
}
`

const Draft = ({
  selectedPick,
  draftPickNumber = 1,
  lastPick,
  players,
}: Draft) => {
  const draft = { id: null, Teams: [] } as any
  const [myQueue, setQueue] = React.useState([])
  // const selectedPick = {};
  const leagueId = ''
  const isUserDrafting = false
  const user = {} as any
  const teamsDraftingByRound = {}
  const userTeam = '' as any
  // tslint:disable-next-line:no-empty
  const draftPlayer = () => {}

  const playerSelected = ({ id, Name, Position }: any) => {
    selectedPick = {
      id,
      Name,
      LineUpPosition: `${Position}1`,
      TeamID: userTeam ? userTeam.id : null,
      DraftID: draft.id,
    }
  }

  const isPlayerQueued = (player: { id: any }) => {
    return myQueue.find((i: { id: any }) => i.id === player.id)
  }

  const toggleQueuedPlayer = (player: any) => {
    if (isPlayerQueued(player)) {
      setQueue(removeQueuePlayer(player))
    } else {
      setQueue(addQueuePlayer(player))
    }
  }

  const removeQueuePlayer = (player: { id: any }) => {
    const queue = [...myQueue]
    const index = queue.findIndex((i: { id: any }) => i.id === player.id)
    return queue.splice(index, 1)
  }

  const addQueuePlayer = (player: any) => {
    const queue = [...myQueue] as any
    queue.push(player)
    return queue
  }

  const [__res, executeExitDraftMutation] = useMutation(exitDraftMutation)

  return (
    <div className="vsf-draft">
      {/* <div className="vsf-draft__sticky">Hello</div> */}
      <div className="nfx-draft__exit">
        <Button
          text="Exit Draft"
          onClick={() => {
            executeExitDraftMutation({ userId: user.id, draftId: 1 })
          }}
        >
          <i className="material-icons">exit_to_app</i>
        </Button>
      </div>
      <div className="nfx-draft__header">
        <div className="nfx-draft__queued-pick">
          <span>
            <i className="nfx-draft__queued-icon material-icons">person</i>
            {!selectedPick.hasOwnProperty('id') ? (
              <span>No Player Selected</span>
            ) : null}
            {selectedPick && selectedPick.Name}
          </span>
          <Button
            text="Draft Player"
            onClick={draftPlayer}
            alt
            disabled={!selectedPick.hasOwnProperty('id')}
          />
        </div>
      </div>
      <section className="nfx-draft__content">
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>
                <abbr title="Position">Pos</abbr>
              </th>
              <th>
                <abbr title="Rank">Rnk</abbr>
              </th>
              <th style={{ width: '100%' }}>
                <abbr title="Name">Name</abbr>
              </th>
              <th>
                <abbr title="ADP">ADP</abbr>
              </th>
              <th>
                <abbr title="FX Pts">FTP</abbr>
              </th>
              <th>
                <abbr title="Age">Age</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {draft.players((player: any) => {
              return (
                <tr key={player.id} onClick={() => playerSelected(player)}>
                  <th>
                    <i
                      onClick={() => toggleQueuedPlayer(player)}
                      className={classNames(
                        'nfx-draft__star-icon material-icons',
                        {
                          'is-active': isPlayerQueued(player),
                        }
                      )}
                    >
                      {isPlayerQueued(player) ? 'star' : 'star_border'}
                    </i>
                  </th>
                  <th>{player.Position}</th>
                  <td>{player.Rank}</td>
                  <td>{player.Name}</td>
                  <td>{player.AverageDraftPosition}</td>
                  <td>{player.FantasyPoints}</td>
                  <td>{player.Age}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
      <div className="vsf-draft__sidebar-left">
        <div className="vsf-draft__timer">Draft Start / Timer</div>
        <div className="vsf-draft__pick">
          You have the {draftPickNumber}st Pick
        </div>
        <DraftOrder teams={teamsDraftingByRound} />
      </div>
      <div className="vsf-draft__sidebar-right">
        <div className="vsf-draft__picks">
          <h3>My Picks</h3>
          <aside v-if="userTeam" className="menu">
            <ul className="menu-list">
              {userTeam.Players.map((userPick: any, index: any) => (
                <li
                  v-for="(userPick, index) in userTeam.Players"
                  key={`user_pick_${index}`}
                >
                  <span>{index + 1}. </span>
                  <span>{userPick.Name}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="vsf-draft__queued">
          <h3>My Queue</h3>
          {myQueue ? (
            <aside className="menu">
              <ul className="menu-list">
                {myQueue.map((queuedPlayer: any, index: any) => (
                  <li key={`queue_${queuedPlayer.id}`}>
                    <span>{`${index} + 1`}. </span>
                    <span>{queuedPlayer.Name}</span>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </div>
      <div className="vsf-draft__footer">The Last Pick Was: {lastPick}</div>
    </div>
  )
}

export default Draft;