import * as React from 'react'
import { format } from 'date-fns'

import { DEFAULT_DATE_FORMAT } from '../../const'

const today = format(new Date(), DEFAULT_DATE_FORMAT)

const Dashboard = ({ gameWeek = 1, gameInfo = {}, slides = [] }: any) => (
  <div className="vsf-dashboard notification">
    <h1 className="vsf-dashboard__header title">
      <span>Weekly Games</span>
      <span>Date: {today}</span>
      <span>Game Week: {gameWeek}</span>
    </h1>
    {gameInfo.games &&
      gameInfo.Games.map((game: any) => (
        <section
          className="vsf-dashboard__games"
          v-for="game in"
          key={game.gameId}
        >
          <div>
            Location: {game.stadium} | Weather Forecast: {game.forecast}
            <span>
              {navigator && navigator.onLine ? <img src={game.smallImg} /> : ''}
            </span>
          </div>
          <div>
            {game.homeTeam} VS {game.awayTeam}{' '}
            <span> Winner: {game.winner} </span>
          </div>
          <hr />
        </section>
      ))}
    {/** <vsf-slide v-once :slides="slides"></vsf-slide> */}
  </div>
)

export default Dashboard
