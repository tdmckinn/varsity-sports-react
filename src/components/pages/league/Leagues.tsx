import * as React from 'react'
import { observer } from 'mobx-react'
import { useQuery } from 'urql'

import {
  Button,
  League,
  LeagueModiferModal,
  SectionHeader,
  Input,
} from '../..'
import { getLeagues } from '../../../queries/league'
import { useStores } from '../../../hooks/use-stores'
import { ILeague } from '../../../types'

import './Leagues.scss'

const MAX_LEAGUES_PER_COMMISH = 5

const Leagues = observer(() => {
  const {
    authStore: { user },
  } = useStores()

  const [leagueNameQuery, setLeagueNameQuery] = React.useState('')
  const [isLeagueModiferModalActive, showLeagueModiferModal] = React.useState(
    false
  )

  const [{ fetching, error, data }] = useQuery({
    query: getLeagues,
  })

  if (fetching) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>:( Couldn't load leagues try again</div>
  }

  const { leagues }: { leagues: ILeague[] } = data
  const hasMaxLeaguesCreated =
    leagues &&
    leagues.filter((league) => league.CommissionerID === user.id).length ===
      MAX_LEAGUES_PER_COMMISH

  const filterRegex = new RegExp(`^${leagueNameQuery}`)
  const displayLeagues = leagues.filter(({ LeagueName }) => {
    if (leagueNameQuery === '') return true

    if (LeagueName.match(filterRegex)?.length > 0) {
      return true;
    }

    return false
  }).map((league, index: number) => (
    <League key={index} league={league} />
  ))

  return (
    <div className="vsf-app__leagues">
      <SectionHeader title="Leagues" />
      <nav className="vsf-app__leagues-actions level">
        <div className="level-left">
          <div className="level-item">
            <p className="subtitle is-5">
             <strong>{displayLeagues.length}</strong> of <strong>{leagues.length}</strong> League(s)
            </p>
          </div>
          <div className="level-item">
            <div className="field has-addons">
              <p className="control">
                <Input
                  type="text"
                  value={leagueNameQuery}
                  placeholder="Find a league"
                  onChange={(event) => {
                    setLeagueNameQuery(event.target.value)
                  }}
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
        {displayLeagues}
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
