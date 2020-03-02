import * as React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'
import { observer } from 'mobx-react'

import { Button, SectionHeader, Modal, EmptyState } from '../..'
import { getUserTeams } from '../../../queries/teams/teamsQuery'
import { useStores } from '../../../hooks/use-stores'
import { IUserTeam } from '../../../types'

import './Teams.scss'

const Teams = observer(() => {
  const {
    authStore: { user },
  } = useStores()

  // const [leagueNameQuery, setLeagueNameQuery] = React.useState('')
  // const [isLeagueModiferModalActive, showLeagueModiferModal] = React.useState(
  //   false
  // )

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

  const viewTeamClick = (team: IUserTeam) => {
    console.log(team)
    return ''
  }
  const joinLeagueClick = () => {
    return ''
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
                  viewTeamClick(team)
                }}
                alt
              />
            </div>
          ))
        ) : (
          <div>
            <EmptyState />
            <div className="nfx-my-teams__empty">
              Looks like you have don't teams, join a league to get started.
              <Link className="button" to="/leagues">
                Join a League
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
})

export default Teams
