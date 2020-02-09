import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { AuthStore, Stores } from '../stores'

interface PrivateRouteProps {
  authStore?: AuthStore
  component: any
  path: string
  exact?: boolean
}

function PrivateRoute({
  component: Component,
  exact,
  path,
  authStore,
}: PrivateRouteProps) {
  return (
    <Route
      exact={exact || false}
      path={path}
      render={(props) =>
        authStore!.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default inject(({ stores }: { stores: Stores }) => ({
  authStore: stores.authStore as AuthStore,
}))(observer(PrivateRoute))
