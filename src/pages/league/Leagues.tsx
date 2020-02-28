import * as React from 'react'
import { observer } from 'mobx-react'
import { useQuery } from 'urql'

import {
  League,
  LeagueModiferModal,
  SectionHeader,
  Button,
} from '../../components'
import { getLeagues } from '../../queries/league'
import { useStores } from '../../hooks/use-stores'
import { ILeague } from '../../types'

import './Leagues.scss'

const Leagues = observer(() => {
  const {
    authStore: { user },
  } = useStores()

  const [{ fetching, error, data }] = useQuery({
    query: getLeagues,
  })

  const [isLeagueModiferModalActive, showLeagueModiferModal] = React.useState(
    false
  )

  if (fetching) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>:( Couldn't load leagues try again</div>
  }

  const { leagues }: { leagues: ILeague[] } = data
  const hasMaxLeaguesCreated =
    leagues &&
    leagues.filter((league) => league.CommissionerID === user.id).length === 5

  return (
    <div className="vsf-app__leagues">
      <SectionHeader title="Leagues" />
      <nav className="vsf-app__leagues-actions level">
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
              classes="is-success"
              text="Create League"
              disabled={hasMaxLeaguesCreated}
              title={
                hasMaxLeaguesCreated
                  ? 'Max Leagues Per User: 5'
                  : 'Create A League'
              }
              onClick={() => {
                showLeagueModiferModal(true)
              }}
            />
          </p>
        </div>
      </nav>
      <section>
        {leagues.map((league: any, index: number) => (
          <League key={index} league={league} />
        ))}
        {isLeagueModiferModalActive ? (
          <LeagueModiferModal
            type="createLeague"
            close={() => {
              showLeagueModiferModal(!isLeagueModiferModalActive)
            }}
          />
        ) : null}
      </section>
    </div>
  )
})

export default Leagues
