import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as UrqlProvider } from 'urql'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { configure } from 'mobx'

import { client } from './gqlClient'
import App from './App'

import './index.scss'

// import * as serviceWorker from './serviceWorker'

configure({ enforceActions: 'observed' })

ReactDOM.render(
  <UrqlProvider value={client}>
      <Router history={createBrowserHistory()}>
        <App />
      </Router>
  </UrqlProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()
