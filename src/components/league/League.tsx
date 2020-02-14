import * as React from 'react'
import { format } from 'date-fns'

import { DRAFT_DATE_TIME_FORMAT } from '../../const'

import './styles/League.scss'

export interface League {
  id: number
  DraftID: number
  DraftDateTime: string
  CommissionerName: string
  CommissionerID: string
  LeagueName: string
  LeagueTeams: any
  LeagueSettings: any
  Users: any
  DateCreated: string
  IsDraftComplete: boolean
}

interface LeagueProps {
  league: League
  actions?: JSX.Element
  children?: any
}

function draftDate(date: string) {
  if (!date) {
    return ''
  }
  return format(new Date(date), DRAFT_DATE_TIME_FORMAT)
}

const League = ({ league, children }: LeagueProps) => (
  <div className="vsf-league">
    <div className="vsf-league__item" key={league.id}>
      <div className="vsf-league__content">
        <span className="vsf-league__name">{league.LeagueName}</span>
        <span className="vsf-league__tag tag is-light">
          {league.LeagueTeams.length} of {league.LeagueSettings.MaxTeams}{' '}
          Members
        </span>
        <span className="vsf-league__tag tag is-light">
          Draft Start: {draftDate(league.DraftDateTime)}
        </span>
      </div>
      {children}
    </div>
  </div>
)

export default League
