import * as React from 'react'

import { LiveDraft, SectionHeader } from '../..'

import './Draft.scss'

const Draft = () => (
  <div className="nfx-app-draft">
    <SectionHeader title="Draft" />
    <div className="nfx-app-draft__container">
      <div className="nfx-app-draft__wizard">
        <h3>Draft Wizard</h3>
        <aside className="menu">
          <p className="menu-label">General</p>
          <ul className="menu-list">
            <li>
              <a>Mock Draft Simulator</a>
            </li>
          </ul>
        </aside>
      </div>
      <div>
        <LiveDraft />
      </div>
    </div>
  </div>
)

export default Draft
