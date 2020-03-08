/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react'
import { useQuery } from 'urql'

import { Player, Button } from '../..'
import { getPlayers } from '../../../queries/player/playerQuery'
import { IPlayer } from '../../../types'

import Modal from '../../portal/Modal'

import './Players.scss'

interface IPlayerModal {
  player: IPlayer
  close: () => void
}

const PlayerModal = ({ close, player }: IPlayerModal) => {
  const removePlayer = () => {}
  const addPlayer = () => {}
  const isPlayerOnMyWatchList = false

  return (
    <Modal isAcitve={true}>
      <div className="nfx-player-modal modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Player Details</p>
          <button className="delete" onClick={close}></button>
        </header>
        {player ? (
          <section className="modal-card-body">
            <Player player={player} />
          </section>
        ) : null}
        <footer className="modal-card-foot">
          {!isPlayerOnMyWatchList ? (
            <Button classes="button is-success" onClick={addPlayer}>
              Add Player
            </Button>
          ) : (
            <>
              <Button classes="button is-danger" onClick={removePlayer}>
                <i className="material-icons">star</i>
                Watch List
              </Button>
              <Button classes="button" onClick={close}>
                Cancel
              </Button>
            </>
          )}
        </footer>
      </div>
    </Modal>
  )
}

const Players = () => {
  const [selectedPlayer, setSelectedPlayer] = React.useState({})
  const [isPlayerModalActive, setPlayerModalActive] = React.useState(false)

  const [{ fetching, error, data }] = useQuery({
    query: getPlayers,
  })

  if (fetching) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>:( Couldn't load players try again</div>
  }

  const { players }: { players: IPlayer[] } = data
  return (
    <div className="nfx-players">
      <h1 className="nfx-players__header title"> Players </h1>
      {players?.map((player) => (
        <div key={player.id}>
          <Player
            onClick={() => {
              setSelectedPlayer(player)
              setPlayerModalActive(true)
            }}
            player={player}
          />
        </div>
      ))}
      {isPlayerModalActive ? (
        <PlayerModal
          player={selectedPlayer as IPlayer}
          close={() => {
            setPlayerModalActive(false)
          }}
        />
      ) : null}
    </div>
  )
}

export default Players
