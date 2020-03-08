import * as React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'
import { observer } from 'mobx-react'

import { Button, SectionHeader, Modal, EmptyState } from '../..'
import { getUserTeams } from '../../../queries/teams/teamsQuery'
import { useStores } from '../../../hooks/use-stores'
import { IUserTeam } from '../../../types'

import './Teams.scss'

const getPlayersByTeam = (selectedTeam: IUserTeam) => {
  if (!selectedTeam || !selectedTeam.Players) {
    return {}
  }
  const { Players } = selectedTeam
  return {
    QB1: Players.find((player) => player.LineUpPosition === 'QB1'),
    WR1: Players.find((player) => player.LineUpPosition === 'WR1'),
    WR2: Players.find((player) => player.LineUpPosition === 'WR2'),
    RB1: Players.find((player) => player.LineUpPosition === 'RB1'),
    RB2: Players.find((player) => player.LineUpPosition === 'RB2'),
    TE: Players.find((player) => player.LineUpPosition === 'TE'),
    Flex: Players.find((player) => player.LineUpPosition === 'Flex'),
    Kicker: Players.find((player) => player.LineUpPosition === 'K'),
    DEF: Players.find((player) => player.LineUpPosition === 'DEF'),
    Bench: Players.filter((player) => player.LineUpPosition === 'BN'),
  }
}

const Teams = observer(() => {
  const {
    authStore: { user },
  } = useStores()

  const [selectedTeam, setSelectedTeam] = React.useState(
    ({} as any) as IUserTeam
  )
  const [isModalActive, setModalActive] = React.useState(false)

  const [{ fetching, error, data }] = useQuery({
    query: getUserTeams,
    variables: { userId: user.id },
  })

  if (fetching) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>:( Couldn't load user teams please try again</div>
  }

  const { userTeams = [] }: { userTeams: IUserTeam[] } = data
  const playersBySelectedTeam = isModalActive
    ? getPlayersByTeam(selectedTeam as IUserTeam)
    : {}

  const closeModal = () => {
    setModalActive(false)
  }

  return (
    <section className="nfx-my-teams">
      <div>
        <SectionHeader title="My Teams" />
        {userTeams.length ? (
          userTeams.map((team) => (
            <div className="nfx-team__item" key={team.id}>
              <p className="nfx-team__item-text">{team.Name}</p>
              <Button
                text="View Team"
                onClick={() => {
                  setSelectedTeam(team)
                  setModalActive(true)
                }}
                alt
              />
            </div>
          ))
        ) : (
          <div>
            <EmptyState />
            <div className="nfx-my-teams__empty">
              Looks like you have don't any teams, join a league to get started.
              <Link className="button" to="/leagues">
                Join a League
              </Link>
            </div>
          </div>
        )}
      </div>
      {isModalActive ? (
        <Modal isAcitve={true}>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Team: {selectedTeam.Name}</p>
              <button className="delete" onClick={closeModal}></button>
            </header>
            <section className="modal-card-body">
              {Object.entries(playersBySelectedTeam).length === 0 ? (
                <>
                  <EmptyState />
                  <div className="nfx-my-players__empty">
                    Looks like you have don't players on your team yet, please
                    check your leagues draft time to get started.
                    <div>
                      <Link
                        className="button has-background-warning"
                        to="/leagues"
                      >
                        View Leagues
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="nfx-team__party">Offense</div>
                  <div className="nfx-team__player">
                    <span className="nfx-team__position">QB</span>
                    {playersBySelectedTeam.QB1.Name}
                  </div>
                  <div className="nfx-team__player">
                    <span className="nfx-team__position">WR</span>
                    {playersBySelectedTeam.WR1.Name}
                  </div>
                  <div className="nfx-team__player">
                    <span className="nfx-team__position">RB</span>
                    {playersBySelectedTeam.WR2.Name}
                  </div>
                  <div className="nfx-team__player">
                    <span className="nfx-team__position">RB</span>
                    {playersBySelectedTeam.RB1.Name}
                  </div>
                  <div className="nfx-team__player">
                    <span className="nfx-team__position">RB</span>
                    {playersBySelectedTeam.RB2.Name}
                  </div>
                  <div className="nfx-team__player">
                    <span className="nfx-team__position">TE</span>
                    {playersBySelectedTeam.TE.Name}
                  </div>
                  <div className="nfx-team__player">
                    <span className="nfx-team__position">W/R/T</span>
                    {playersBySelectedTeam.Flex.Name}
                  </div>
                  {playersBySelectedTeam.Bench.map(({ Name, id }) => (
                    <div className="nfx-team__player" key={id}>
                      <span className="nfx-team__position">BN</span>
                      {Name}
                    </div>
                  ))}
                  <div className="nfx-team__party">Kicker</div>
                  <div className="nfx-team__player">
                    <span className="nfx-team__position">K</span>
                    {playersBySelectedTeam.Kicker.Name}
                  </div>
                  <div className="nfx-team__party">Defense Special / Teams</div>
                  <div className="nfx-team__player">
                    <span className="nfx-team__position">DEF</span>
                    {playersBySelectedTeam.DEF.Name}
                  </div>
                </>
              )}
            </section>
            <footer className="modal-card-foot">
              <Button classes="button" onClick={closeModal}>
                Close
              </Button>
            </footer>
          </div>
        </Modal>
      ) : null}
    </section>
  )
})

export default Teams
