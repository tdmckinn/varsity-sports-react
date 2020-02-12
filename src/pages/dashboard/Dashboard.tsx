import * as React from 'react'
import { format } from 'date-fns'
import { useQuery } from 'urql';

import { GameSchedule } from "../../types"
import { DEFAULT_DATE_FORMAT } from '../../const'

const today = format(new Date(), DEFAULT_DATE_FORMAT)

const Dashboard = () => {
  const [{ fetching, error, data }] = useQuery({
    query: `
      query ScheduledGames {
        weeklyGames {
          id
          week
          broadcasters
          startTime
          awayTeam {
            id
            abbreviation
          }
          homeTeam {
            id
            abbreviation
          }
          venue {
            id
            name
          }
          weather {
            type
            description
            temperature {
              fahrenheit
            }
            wind {
              direction {
                degrees
                label
              }
            }
          }
        }
      }
    `
  });

  return (
    <div className="vsf-dashboard notification">
      <h1 className="vsf-dashboard__header title">
        <span>Weekly Games</span>
        <span>Date: {today}</span>
      </h1>
      {data && data.weeklyGames &&
        data.weeklyGames.map((schedule: GameSchedule) => (
          <section
            className="vsf-dashboard__games"
            key={schedule.id}
          >
            <div>
              Location: {schedule.venue.name} | Weather Forecast: {schedule.weather.description}
            </div>
            <div>
              {schedule.homeTeam.abbreviation} VS {schedule.awayTeam.abbreviation}{' '}
              <span> Game Start: {schedule.startTime} </span>
            </div>
            <hr />
          </section>
        ))}
      {/** <vsf-slide v-once :slides="slides"></vsf-slide> */}
    </div>
  )
}

export default Dashboard
