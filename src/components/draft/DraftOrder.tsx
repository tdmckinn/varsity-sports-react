import * as React from 'react'

import './styles/DraftOrder.scss'

interface DraftOrderProps {
  teams: any
}

const DraftOrder = ({ teams }: DraftOrderProps) => (
  <div className="vsf-draft__order">
    <h3>Draft Order</h3>
    {teams ? (
      <aside v-if="teams" className="menu">
        {teams.map((index: any, team: any) => (
          <div key={team.id}>
            <p className="menu-label">Round {index + 1}</p>
            <ul className="menu-list">
              <li>
                <span>1</span>
                <span>Peter's Team</span>
              </li>
              <li>
                <span>1</span>
                <span>Peter's Team</span>
              </li>
              <li>
                <span>1</span>
                <span>Peter's Team</span>
              </li>
              <li>
                <span>1</span>
                <span>Peter's Team</span>
              </li>
              <li>
                <span>1</span>
                <span>Peter's Team</span>
              </li>
              <li>
                <span>1</span>
                <span>Peter's Team</span>
              </li>
              <li>
                <span>1</span>
                <span>Peter's Team</span>
              </li>
              <li>
                <span>1</span>
                <span>Peter's Team</span>
              </li>
              <li>
                <span>1</span>
                <span>Peter's Team</span>
              </li>
              <li>
                <span>1</span>
                <span>Peter's Team</span>
              </li>
            </ul>
          </div>
        ))}
      </aside>
    ) : (
      ''
    )}
  </div>
)

export default DraftOrder
