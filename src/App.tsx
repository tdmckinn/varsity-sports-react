import * as React from 'react'
import {
  Route,
  withRouter,
  Switch,
  RouteComponentProps,
} from 'react-router-dom'
// import DevTools from 'mobx-react-devtools'
import { observer, inject } from 'mobx-react'

import { Header, Footer, LoadingSpinner, ThemeMusic, Login } from './components'
import PrivateRoute from './router/PrivateRoute'
import { Stores, AuthStore } from './stores'

import './App.scss'

interface AppProps extends RouteComponentProps<any>, React.Props<any> {
  isUserDraftLoading?: boolean
  authStore?: AuthStore
}

interface AppState {}

// const isDevelopment = process.env.NODE_ENV === 'development'

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

// @see: https://github.com/ReactTraining/react-router/issues/6420
const Dashboard = React.lazy(() =>
  import('./pages/dashboard/Dashboard' /* webpackChunkName: "dashboard" */)
)
// const UsersTeams = React.lazy(() =>
//   import('./pages/teams/Teams' /* webpackChunkName: "my-team" */))
// const Players = React.lazy(() =>
//   import('./pages/AppPlayers' /* webpackChunkName: "players" */))
// const Research = React.lazy(() =>
//   import('./pages/AppResearch' /* webpackChunkName: "research" */))
// const TopDrafts = React.lazy(() =>
//   import('./pages/AppTopDrafts' /* webpackChunkName: "top-drafts" */))
// const AppDraft = React.lazy(() =>
//   import('./pages/AppDraft' /* webpackChunkName: "draft" */))
const Leagues = React.lazy(() =>
  import('./pages/league/Leagues' /* webpackChunkName: "leagues" */)
)
// const NfxDraft = React.lazy(() =>
//   import('./components/draft/NfxDraft' /* webpackChunkName: "nfx-draft-live" */))

@inject(({ stores }: { stores: Stores }) => ({
  authStore: stores.authStore as AuthStore,
}))
@observer
class App extends React.Component<AppProps, AppState> {
  componentDidMount() {
    const {authStore} = this.props
    if (authStore) {
      authStore.login()
    }
  }

  render() {
    const {
      authStore: { user },
      isUserDraftLoading,
    } = this.props
    return (
      <>
        <div className="vsf-app app">
          {/* {isDevelopment ? <DevTools /> : ''} */}
          <Header user={user} />
          {user.isLoggedIn ? (
            <main className="vsf-app__main container is-fluid">
              <React.Suspense fallback={<LoadingSpinner />}>
                <Switch>
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <PrivateRoute path="/leagues" component={Leagues} />
                  <Route
                    path="/"
                    exact
                    render={(props) => <Dashboard {...props} />}
                  />
                  <Route path="*" exact component={NotFoundComponent} />
                </Switch>
              </React.Suspense>
            </main>
          ) : (
            <main className="vsf-app__main--login">
              <Login />
            </main>
          )}
          <Footer>
            <ThemeMusic />
          </Footer>
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
  }
}

export default withRouter(App)
