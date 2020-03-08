import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'

import { useStores } from '../hooks/use-stores'

interface PrivateRouteProps {
  component: any
  path: string
  exact?: boolean
}

const PrivateRoute = observer(
  ({ component: Component, exact, path }: PrivateRouteProps) => {
    const { authStore } = useStores()

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
)

export default PrivateRoute
