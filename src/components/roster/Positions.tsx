import * as React from 'react'
import { Query } from 'urql'
import gql from 'graphql-tag'

import { Select } from '../index'

const Positions = () => (
  <Query
    query={gql`
      {
        rosterPositions {
          id
          Name
        }
      }
    `}
  >
    {({ loading, error, data }: any) => {
      if (loading) {
        return <p>Loading...</p>
      }
      if (error) {
        return <p>Error :(</p>
      }

      return (
        <div className="vsf-positions">
          <Select
            placeholder="Roster Positions"
            options={data.rosterPositions}
          />
        </div>
      )
    }}
  </Query>
)

export default Positions
