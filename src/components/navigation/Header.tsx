import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getYear } from 'date-fns'
import { useObserver } from 'mobx-react'

import Sidebar from './Sidebar'

import helmentIcon from '../../assets/svgs/defaultHelment.svg'
import { useStores } from '../../hooks/use-stores'

import './styles/Header.scss'

const navBarItems = [
  { name: 'My Teams', route: '/teams' },
  { name: 'Leagues', route: '/leagues' },
  { name: 'Players', route: '/players' },
  // { name: 'Drafts', route: '/drafts' },
  {
    name: 'Logout',
    isOnlyMobile: true,
    isDefault: true,
    route: '/logout',
  },
]

const Header = () => {
  const {
    authStore: { user, logout },
  } = useStores()
  const history = useHistory()

  const handleLogoutClick = () => {
    logout()
    history.push('/dashboard')
  }

  return useObserver(() => (
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
            {navBarItems.map(
              ({ name, route, isOnlyMobile, isDefault }, index: number) => {
                return !isOnlyMobile ? (
                  isDefault ? (
                    <a
                      className="navbar-item"
                      href="#"
                      onClick={handleLogoutClick}
                    >
                      Logout
                    </a>
                  ) : (
                    <Link to={route} className="navbar-item" key={index}>
                      {name}
                    </Link>
                  )
                ) : null
              }
            )}
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="#">
                <img src={helmentIcon} />
              </a>
              <div className="navbar-dropdown is-boxed">
                <a className="navbar-item" href="#" onClick={handleLogoutClick}>
                  Logout
                </a>
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
  ))
}

export default Header
