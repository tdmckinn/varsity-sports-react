import * as React from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import { useMutation } from 'urql'
import { observer } from 'mobx-react'

import { Button } from '..'
import DraftOrder from './DraftOrder'
import { UserPlayer } from '../../types'
import { useStores } from '../../hooks/use-stores'
import { noop } from '../../utils/noop'

import './styles/LiveDraft.scss'

const exitDraftQGL = `
mutation($userId: String!, $draftId: String!) {
  exitDraftSession(user: $user, draftId: $id) {
    success
  }
}
`

const enterDraftGQL = `
  mutation($leagueId: String!) {
    enteredDraft(leagueId: $leagueId) {
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
        }
      }
    }
  }
`
const LiveDraft = observer(() => {
  const {
    authStore: { user },
  } = useStores()
  const history = useHistory()
  const [myQueue, setQueue] = React.useState([])
  const [selectedPick, setSelectedPick] = React.useState<UserPlayer | null>(
    null
  )
  const [_enterDraftResponse, enterDraft] = useMutation(enterDraftGQL)
  const [__res, exitDraft] = useMutation(exitDraftQGL)

  React.useEffect(() => {
    // enterDraft({
    //   leagueId: league.id,
    // }).then(({ data: { enteredDraft } }: any) => {
    //   if (enteredDraft) {
    //     history.push(`/draft/${league.id}`)
    //   }
    // })
  }, [])

  const lastPick = selectedPick
  const draftPickNumber = 1
  const players = []
  const draft = { id: null, Teams: [], players: [] } as any

  const leagueId = 1
  const teamsDraftingByRound = []
  const userTeam = '' as any
  const draftPlayer = noop

  const playerSelected = ({ id, Name, Position }: UserPlayer) => {
    setSelectedPick({
      id,
      Name,
      Position: `QB`,
      LineUpPosition: `${Position}1`,
      TeamID: userTeam ? userTeam.id : null,
    })
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

  return (
    <div className="vsf-draft">
      <div className="vsf-draft__exit">
        <Button
          text="Exit Draft"
          onClick={() => {
            confirm('Are you sure you want to exit the draft?')
            history.push('/leagues')
            // exitDraft({ userId: user.id, draftId: 1 })
          }}
        >
          <i className="material-icons">exit_to_app</i>
        </Button>
      </div>
      <div className="vsf-draft__header">
        <div className="vsf-draft__queued-pick">
          <span>
            <i className="vsf-draft__queued-icon material-icons">person</i>
            {!selectedPick ? <span>No Player Selected</span> : null}
            {selectedPick && selectedPick.Name}
          </span>
          <Button
            text="Draft Player"
            onClick={() => {
              draftPlayer()
            }}
            alt
            disabled={!selectedPick}
          />
        </div>
      </div>
      <section className="vsf-draft__content">
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
            {draft.players.map((player: any) => {
              return (
                <tr key={player.id} onClick={() => playerSelected(player)}>
                  <th>
                    <i
                      onClick={() => toggleQueuedPlayer(player)}
                      className={classNames(
                        'vsf-draft__star-icon material-icons',
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
              {userTeam?.Players?.map((userPick: any, index: any) => (
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
})

export default LiveDraft
