import * as React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import './styles/Sidebar.scss'

// className="{ 'is-active' :isSidebarOpen }"

const Sidebar = ({ navBarItems, isSidebarOpen }: any) => (
  <div className={cx('vsf-sidebar', { 'is-active': isSidebarOpen })}>
    <aside className="vsf-sidebar__menu">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        {navBarItems.map(({ name, route }: any, index: any) => (
          <Link to={route} className="navbar-item" key={index}>
            {name}
          </Link>
        ))}
      </ul>
    </aside>
  </div>
)

export default Sidebar
