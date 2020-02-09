import * as React from 'react'
import { Link } from 'react-router-dom'
import { getYear } from 'date-fns'
import { observer } from 'mobx-react'

import Sidebar from './Sidebar'

import './styles/Header.scss'
import helmentIcon from '../../assets/svgs/defaultHelment.svg'

const navBarItems = [
  { name: 'My Teams', route: '/teams' },
  { name: 'Leagues', route: '/leagues' },
  { name: 'Players', route: '/players' },
  { name: 'Highlights', route: '/highlights' },
  { name: 'Draft', route: '/draft' },
  { name: 'Logout', route: '/logout', isOnlyMobile: true },
]

const Header = ({ user }: { user: any }) => (
  <header className="vsf-header">
    <nav className="navbar">
      <a
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
      <div className="navbar-start">
        <Link id="link-brand" className="navbar-item" to="/">
          <h1 className="vsf-brand__title title is-3">
            Varsity Sports <span>{getYear(new Date())}</span>
          </h1>
        </Link>
      </div>
      {user.isLoggedIn ? (
        <div className="navbar-end navbar-menu">
          {navBarItems.map(({ name, route, isOnlyMobile }, index: number) => {
            return !isOnlyMobile ? (
              <Link to={route} className="navbar-item" key={index}>
                {name}
              </Link>
            ) : (
              ''
            )
          })}
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" href="#">
              <img src={helmentIcon} />
            </a>
            <div className="navbar-dropdown is-boxed">
              <Link className="navbar-item" to="/logout">
                Logout
              </Link>
              <a className="navbar-item">User: {user.fullName}</a>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </nav>
    <Sidebar navBarItems={navBarItems} />
  </header>
)

export default observer(Header)
