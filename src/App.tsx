import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { observer } from 'mobx-react'

import { Header, Footer, LoadingSpinner, Login } from './components'
import PrivateRoute from './router/PrivateRoute'
import { useStores } from './hooks/use-stores'

import './App.scss'

const NotFoundComponent = () => (
  <section className="hero">
    <div className="hero-body">
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 className="title">Sorry Page Not Found</h1>
        <h2 className="subtitle">
          Please try one of the links at the top menu.
        </h2>
      </div>
    </div>
  </section>
)

const Dashboard = React.lazy(() =>
  import(
    './components/pages/dashboard/Dashboard' /* webpackChunkName: "dashboard" */
  )
)
const UsersTeams = React.lazy(() =>
  import('./components/pages/teams/Teams' /* webpackChunkName: "my-teams" */)
)
const Players = React.lazy(() =>
  import('./components/pages/players/Players' /* webpackChunkName: "players" */)
)
const Draft = React.lazy(() =>
  import('./components/pages/draft/Draft' /* webpackChunkName: "draft" */)
)
const Leagues = React.lazy(() =>
  import('./components/pages/league/Leagues' /* webpackChunkName: "leagues" */)
)

const App = observer(() => {
  const { authStore } = useStores()

  React.useEffect(() => {
    if (authStore) {
      authStore.login()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    authStore: { user },
  } = useStores()
  const isUserDraftLoading = false

  return (
    <>
      <div className="vsf-app app">
        <Header />
        {user.isLoggedIn ? (
          <main className="vsf-app__main container is-fluid">
            <React.Suspense fallback={<LoadingSpinner />}>
              <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/leagues" component={Leagues} />
                <PrivateRoute path="/Players" component={Players} />
                <PrivateRoute path="/teams" component={UsersTeams} />
                <PrivateRoute path="/league-lobby/:id" component={Draft} />
                <PrivateRoute path="/draft/:id" component={Draft} />
                <Route path="/" exact render={(props) => <Dashboard />} />
                <Route path="*" exact component={NotFoundComponent} />
              </Switch>
            </React.Suspense>
          </main>
        ) : (
          <main className="vsf-app__main--login">
            <Login />
          </main>
        )}
        <Footer />
        {isUserDraftLoading ? (
          <div className="vsf-loading--fullscreen">
            <h2 className="vsf-loading__header">vsf FANTASY</h2>
            <div>Loading Draft Please Wait...</div>
            <LoadingSpinner />
          </div>
        ) : (
          ''
        )}
      </div>
      <div id="vsf-modal-root" data-cy="vs-modal-root" />
    </>
  )
})

export default App
